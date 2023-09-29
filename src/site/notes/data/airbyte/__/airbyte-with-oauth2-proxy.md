---
{"dg-publish":true,"permalink":"/data/airbyte/__/airbyte-with-oauth2-proxy/","tags":["airbyte, helm, oauth2-proxy"],"created":"","updated":""}
---

> [!tldr]
> Airbyte 접근제어를 위해 oauth2-proxy 를 사용했고 chart 를 변경하여 default connector 를 제어했다. 접근제어는 이메일 또는 source/dest 커넥터를 차트에 추가하고 argo sync (auto sync 는 off 인 경우) 를 실행한다.

### official chart info
#### Airbyte
- version: **0.44.2**
- [chart](https://github.com/airbytehq/airbyte-platform/tree/v0.45.17-helm) version: **0.45.17**
#### oauth2-proxy
- version: **7.4.0**
- [chart](https://github.com/bitnami/charts/tree/main/bitnami/oauth2-proxy) version: **3.6.3**
- oauth2-proxy architecture
![|500](https://i.imgur.com/QdNwSJN.png)

### oauth 를 적용해보자
- 접근제어를 위해 oauth2-proxy 를 이용함
- 작업 과정은 다음과 같다.
    - 요청자
		- 티켓을 생성하고 슬랙으로 공유
		- 권한 설정 후 airbyte 접근
	- 작업자
		- 요청자 email 을 차트에 기입한다.
			- `oauth2-proxy.configuration.authenticatedEmailsFile`
		- commit 후 argo sync 로 인증된 사용자를 담고 있는 secret 을 갱신함

```yaml
# airbyte root values yaml
oauth2-proxy:
  enabled: true
  image:
    repository: {xxxx}/bitnami/oauth2-proxy
    tag: latest

  nodeSelector:
    node.kubernetes.io/name: mgmt

  service:
    type: NodePort
    port: 80

  configuration:
    clientID: xxx
    clientSecret: xxx
    redirectUrl: xxx

    content: |-
      skip_provider_button = true
      cookie_secure = false
      session_store_type = "redis"
      upstreams = [ "http://airbyte-airbyte-webapp-svc.data.svc.cluster.local:80" ]
      redis_connection_url = [ "redis://airbyte-redis-master.data.svc.cluster.local:6379/1" ]

    authenticatedEmailsFile:
      enabled: true
      content: |-
        jj.lee@xxx.com
        ...
        ...
        sh.lim@xxx.com
        yoori@xxx.com
```

### default connector 를 제어하는 방법
- 왜 커넥터를 관리하는가
	- **보안성 검토 결과 모든 source/destination 을 이용하지 않도록 설정해야함**
- bootloader 차트를 수정하여 커넥터 관리함
- `manageCatalog` custom 값으로 source/destination 을 관리함
- 커넥터를 추가하는 경우
	- 커넥터를 airbyte-bootloader.manageCatalog 의 source 혹은 destination 에 추가
	- push 후 argo sync 로 bootloader pod 를 실행함
```yaml
# airbyte-bootloader.manageCatalog
  manageCatalog:
    enabled: true
    sources:
      - "Coin API"
      - "CoinGecko Coins"
      - "CoinMarketCap"
      - "ElasticSearch"
    destinations:
      - "BigQuery"
      - "BigQuery (denormalized typed struct)"

```

```yaml
# _helpers.tpl
{{- define "bootloader.connectionList" -}}
{{- if .Values.manageCatalog.enabled }}
    {{- $combinedSources := join "', '" .Values.manageCatalog.sources }}
    {{- $combinedDestinations := join "', '" .Values.manageCatalog.destinations }}
    {{- printf "('%s', '%s')" $combinedSources $combinedDestinations }}
{{- else}}
    {{- printf "('Coin API', 'CoinGecko Coins', 'CoinMarketCap', 'BigQuery', 'BigQuery (denormalized typed struct)')"}}
{{- end }}
```

#### 어떻게 조합했냐면요
- airbyte-bootloader 서브차트를 활용함
- 작성한 source / destination 을 읽어 bootloader initContainer 이후 기입한 커넥터를 제외한 나머지를 삭제하는 컨테이너가 동작함
	- 원래 metadb(postgresql) 의 모든 default connector 를 삽입하는 컨테이너는 initContainer 가 아님.
	- **inint 후 커넥터를 삭제하는 작업을 추가하기 위해 container → initContainer 로 변경**
		- 기존: bootloader container(A라고 한다면)
		- 변경: A -> initContainer 로 설정, 필요한 커넥터만 남기고 삭제하는 작업을 하는 container 추가
	- 쿼리 실행을 위한 이미지가 필요
	- ECR 에 psql-client 이미지를 업로드하고, client 에서 쿼리를 실행하는 방법으로 구현
- source/destination 의 목록을 쿼리로 변경하기 위해 helm 변수 활용

```yml
# additional container
  containers:
    - name: airbyte-bootloader-clean
      image: {{ printf "%s:latest" .Values.image.clean.repository }}
      imagePullPolicy: "{{ .Values.image.pullPolicy }}"
      command:
        - "psql"
        - "-c"
        - "delete from actor_definition where name not in {{ include "bootloader.connectionList" . }};"
        - "dbname=db-airbyte user=$(DATABASE_USER) host=$(DATABASE_HOST)"
      env:
        {{- if eq .Values.global.deploymentMode "oss"  }}
        - name: DATABASE_HOST
          valueFrom:
            configMapKeyRef:
              name: {{ .Values.global.configMapName | default (printf "%s-airbyte-env" .Release.Name) }}
              key: DATABASE_HOST
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              name: {{ .Values.global.database.secretName | default (printf "%s-airbyte-secrets" .Release.Name ) }}
              key: {{ .Values.global.database.secretValue | default "DATABASE_PASSWORD" }}
        - name: DATABASE_USER
          valueFrom:
            secretKeyRef:
              name: {{ .Values.global.secretName | default (printf "%s-airbyte-secrets" .Release.Name) }}
              key: DATABASE_USER
        {{- end }}
```

### 후기
- 처음으로 서로 다른 두 차트를 섞어봤다.
- 접근제어가 불가능한 도구는 oauth2-proxy 를 활용할 수 있어 좋았다. 특히 어렵지 않게 설정이 가능하고 추후 다양한 도구에서 사용할 수 있을 것이라 기대한다.
- 데이터엔지니어 보다 클라우드엔지니어가 된 작업이었다. 그만큼 컨테이너 환경을 이해할 수 있었다.
