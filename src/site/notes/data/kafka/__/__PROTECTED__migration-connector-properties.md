---
{"dg-publish":true,"permalink":"/data/kafka/__/__PROTECTED__migration-connector-properties/"}
---



> [!tldr] 커넥터 클러스터에 사용할 설정값을 정리한다.


- 커넥터 설정값을 kafka-connect-ui(dev, prod) 에서 확인할 수 있다. 
- Worker Configuration 은 [data-helm]() 레포 내 coinone-data-warehouse-sink-connector 에서 확인할 수 있다.

### note


- [consumer.override.group.id](https://docs.confluent.io/platform/7.5/connect/references/allconfigs.html#distributed-worker-configuration): 컨슈머 그룹 아이디를 재정의 하는 옵션. 이 옵션을 사용하기 위해서는 worker properties 에 아래 설정이 All 로 설정해야한다.
    - `"connector.client.config.override.policy": "All"`
- `errors.*`: connector 가 메세지 처리에 실패했을 시 행동들을 설정하는 옵션. 오류가 발생해도 task 를 중지하지 않고 오류메세지와 실패한 메세지를 로그에 남긴다.
- `transforms.TimestampConverter.type`: TimestampConverter 트랜스폼을 추가했다. ce_time 헤더값으로 설정된 타임스탬프를 테이블 파티션 열로 설정하기 위해 STRING to TIMESTAMP 형변환이 필요해 이용했다. ([더보기](https://docs.confluent.io/platform/current/connect/transforms/timestampconverter.html))


### dev

```properties
name=ServerlogBigquerySinkConnector  
connector.class=com.wepay.kafka.connect.bigquery.BigQuerySinkConnector  
consumer.override.group.id={PROTECTED}
tasks.max=1  
errors.tolerance = none  
errors.log.enable = true  
errors.log.include.message = true  
topics={PROTECTED}

transforms=tojson,headerToField,TimestampConverter
transforms.tojson.type=com.github.cedelsb.kafka.connect.smt.Record2JsonStringConverter$Value
transforms.tojson.json.string.field.name=value

transforms.headerToField.type=com.github.jcustenborder.kafka.connect.transform.common.HeaderToField$Value
transforms.headerToField.header.mappings={PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING

transforms.TimestampConverter.type=org.apache.kafka.connect.transforms.TimestampConverter$Value
transforms.TimestampConverter.field=ce_time
transforms.TimestampConverter.target.type=Timestamp
transforms.TimestampConverter.format=yyyy-MM-dd'T'HH:mm:ss.SSS

########################################### Fill me in! ###########################################
project={PROTECTED}
defaultDataset={PROTECTED}

keyfile={PROTECTED}
topic2TableMap={PROTECTED}
bigQueryPartitionDecorator=false
timestampPartitionFieldName={PROTECTED}
bigQueryRetry=5
bigQueryRetryWait=10000
```


### prod

```properties
name=ServerlogBigquerySinkConnector  
connector.class=com.wepay.kafka.connect.bigquery.BigQuerySinkConnector  
consumer.override.group.id={PROTECTED}
tasks.max=1  
errors.tolerance = none  
errors.log.enable = true  
errors.log.include.message = true  
topics={PROTECTED}
  
transforms=tojson,headerToField,TimestampConverter  
  
transforms.tojson.type=com.github.cedelsb.kafka.connect.smt.Record2JsonStringConverter$Value  
transforms.tojson.json.string.field.name=value  
  
transforms.headerToField.type=com.github.jcustenborder.kafka.connect.transform.common.HeaderToField$Value  
transforms.headerToField.header.mappings={PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING,{PROTECTED}:STRING  
  
transforms.TimestampConverter.type=org.apache.kafka.connect.transforms.TimestampConverter$Value  
transforms.TimestampConverter.field=ce_time  
transforms.TimestampConverter.target.type=Timestamp  
transforms.TimestampConverter.format=yyyy-MM-dd'T'HH:mm:ss  
  
########################################### Fill me in! ###########################################  
project={PROTECTED}
defaultDataset={PROTECTED}  
keyfile={PROTECTED}
topic2TableMap={PROTECTED}
bigQueryPartitionDecorator=false  
timestampPartitionFieldName={PROTECTED}
bigQueryRetry=5
bigQueryRetryWait=10000
```