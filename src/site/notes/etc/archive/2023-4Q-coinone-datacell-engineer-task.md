---
{"dg-publish":true,"permalink":"/etc/archive/2023-4Q-coinone-datacell-engineer-task/"}
---


> [!welcome] 2023 4Q 일감을 생각해보고 정리한다. 더불어 3분기 리뷰도 남겨보자

### 이미 나온 일감
---
- 데이터 카탈로그 개선
    1. 변경된 메타데이터 알람 (slack)
    2. kafka source ingestion
- lakehouse 구축
    - 목적: 데이터 추출 요청 (수사협조, 불공정), 개인정보 포함
- IaC

### 해보고 싶은 일감
---

> [!todo]
> 개인 일감
> - [ ] vue 강의 듣고 dbt cloud 모방
> - [ ] 

### 3분기 리뷰
---
민우님이 공유해주신 샘플 바탕으로 작성됨

**dbt CI/CD 파이프라인 개선 프로젝트**
- 개요: Atlassian bamboo 에서 운영중인 dbt CI/CD 파이프라인을 Github Actions 로 이관한 프로젝트
- 요구사항: 기존 파이프라인을 유지 및 Github Actions 를 활용한 워크플로우 추가
- 담당업무
    - 기존 파이프라인에서 제공한 기능을 Github Actions 이관
    - 워크플로우 추가 제공: Pull Reqeust checker/labeler, sqlfluff(linter), manual dbt build
- 성과
    - dbt 사용자 경험 향상
        - 로컬에서 운영 모델을 빌드하지 않고, workflow_dispatch 를 이용한 작업자 간 크로스체크 가능한 환경 제공
        - 정해진 양식에 맞는 PR 생성을 유도하고, sqlfluff linter 를 이용해 팀 SQL style 가이드를 따를 수 있도록(또는 협의) 안내
- 개선사항 (*빼도될지..의견이 궁금합니다.*)
    - Custom Actions 개발: docker container 로 빌드되는 workflow 실행시간이 다소 김. javascript/typescript 로 변경한다면 속도 개선 여지

**Airbyte CDK 개발**
- 개요: Airbyte 에서 제공하는 HTTP 커넥터 빌더를 이용해 Elasticsearch to BigQuery 파리프라인 구축
- 요구사항: 로그인 프로세스 개선을 위해 elasticsearch 로그를 데이터웨어하우스로 적재
- 담당업무: Airbyte CDK(Connector Development Kit) 개발
- 성과
    - 수집 효율성 & 비용 감소: 기존 제공되는 커넥터는 Full Table Replication 방식이지만, \_id & timestamp 기반 cursor_field 로 incremental Append 모드 제공.
- 개선사항
    - 커넥터 인터페이스 개선: 사용자가 원하는 쿼리로 수집할 수 있도록 개선

**지표 저장소 운영**
- 개요: 코인원 지표 저장소 운영
- 담당 업무: 사용자 관리, dbt 사고 분석 및 해결
- 개선사항
    - Action 마이그레이션 이후 미동작 기능 지원 (incident)

**실시간 데이터파이프라인 이관(Kinesis to Kafka) - 진행중**
- 개요: Kafka Connect 를 이용한 서버로그 파이프라인 구축
- 요구사항: Kinesis & lambda 를 이용한 서버로그 파이프라인을 kafka 로 이관
- 담당업무: 파이프라인 이관
- 성과
    - 비용감소: 매니지드 서비스 미사용 (kinesis, lambda)
- 개선사항
    - 모니터링: 커넥터 인스턴스 성능 모니터링과 수집 실패한 레코드의 재처리 로직

