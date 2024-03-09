---
{"dg-publish":true,"permalink":"/data/kafka/__/migration-connector-properties/"}
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
consumer.override.group.id=BIGQUERY-SINK-CONNECTOR.CONSUMER-GROUP  
tasks.max=1  
errors.tolerance = none  
errors.log.enable = true  
errors.log.include.message = true  
topics=EVENT.USER.SIGNUP_COMPLETE,EVENT.USER.BANK_ACCOUNT_REGISTRATION,EVENT.USER.BANK_ACCOUNT_DEREGISTRATION,EVENT.AML.KYC_PHONE_AUTH,EVENT.AML.KYC_IDCARD_AUTH,EVENT.AML.KYC_BANK_ACCOUNT_AUTH,EVENT.AML.KYC_CDD_EDD_AUTH,EVENT.AML.KYC_COMPLETE,EVENT.AML.KYC_SAVEPOINT_RESET,EVENT.AML.REVISION_REQUEST_CDD_EDD_AUTH,EVENT.AML.REKYC_CDD_EDD_AUTH,EVENT.USER.BALANCE_TRANSFER_COMPLETE

transforms=tojson,headerToField,TimestampConverter
transforms.tojson.type=com.github.cedelsb.kafka.connect.smt.Record2JsonStringConverter$Value
transforms.tojson.json.string.field.name=value

transforms.headerToField.type=com.github.jcustenborder.kafka.connect.transform.common.HeaderToField$Value
transforms.headerToField.header.mappings=ce_type:STRING,ce_source:STRING,ce_specversion:STRING,ce_time:STRING,ce_id:STRING,ce_subject:STRING

transforms.TimestampConverter.type=org.apache.kafka.connect.transforms.TimestampConverter$Value
transforms.TimestampConverter.field=ce_time
transforms.TimestampConverter.target.type=Timestamp
transforms.TimestampConverter.format=yyyy-MM-dd'T'HH:mm:ss.SSS

########################################### Fill me in! ###########################################
project=coinone-data-dev
defaultDataset=serverlog

keyfile=/mnt/secret-manager/KRDEV-SVA-BIGQUERY-MSK
topic2TableMap=EVENT.USER.SIGNUP_COMPLETE:serverlog_kafka,EVENT.USER.BANK_ACCOUNT_REGISTRATION:serverlog_kafka,EVENT.USER.BANK_ACCOUNT_DEREGISTRATION:serverlog_kafka,EVENT.AML.KYC_PHONE_AUTH:serverlog_kafka,EVENT.AML.KYC_IDCARD_AUTH:serverlog_kafka,EVENT.AML.KYC_BANK_ACCOUNT_AUTH:serverlog_kafka,EVENT.AML.KYC_CDD_EDD_AUTH:serverlog_kafka,EVENT.AML.KYC_COMPLETE:serverlog_kafka,EVENT.AML.KYC_SAVEPOINT_RESET:serverlog_kafka,EVENT.AML.REVISION_REQUEST_CDD_EDD_AUTH:serverlog_kafka,EVENT.AML.REKYC_CDD_EDD_AUTH:serverlog_kafka,EVENT.USER.BALANCE_TRANSFER_COMPLETE:serverlog_kafka
bigQueryPartitionDecorator=false
timestampPartitionFieldName=ce_time
bigQueryRetry=5
bigQueryRetryWait=10000
```


### prod

```properties
name=ServerlogBigquerySinkConnector  
connector.class=com.wepay.kafka.connect.bigquery.BigQuerySinkConnector  
consumer.override.group.id=BIGQUERY-SINK-CONNECTOR.CONSUMER-GROUP  
tasks.max=1  
errors.tolerance = none  
errors.log.enable = true  
errors.log.include.message = true  
topics=EVENT.USER.SIGNUP_COMPLETE,EVENT.USER.BANK_ACCOUNT_REGISTRATION,EVENT.USER.BANK_ACCOUNT_DEREGISTRATION,EVENT.AML.KYC_PHONE_AUTH,EVENT.AML.KYC_IDCARD_AUTH,EVENT.AML.KYC_BANK_ACCOUNT_AUTH,EVENT.AML.KYC_CDD_EDD_AUTH,EVENT.AML.KYC_COMPLETE,EVENT.AML.KYC_SAVEPOINT_RESET,EVENT.AML.REVISION_REQUEST_CDD_EDD_AUTH,EVENT.AML.REKYC_CDD_EDD_AUTH,EVENT.USER.BALANCE_TRANSFER_COMPLETE
  
transforms=tojson,headerToField,TimestampConverter  
  
transforms.tojson.type=com.github.cedelsb.kafka.connect.smt.Record2JsonStringConverter$Value  
transforms.tojson.json.string.field.name=value  
  
transforms.headerToField.type=com.github.jcustenborder.kafka.connect.transform.common.HeaderToField$Value  
transforms.headerToField.header.mappings=ce_type:STRING,ce_source:STRING,ce_specversion:STRING,ce_time:STRING,ce_id:STRING,ce_subject:STRING  
  
transforms.TimestampConverter.type=org.apache.kafka.connect.transforms.TimestampConverter$Value  
transforms.TimestampConverter.field=ce_time  
transforms.TimestampConverter.target.type=Timestamp  
transforms.TimestampConverter.format=yyyy-MM-dd'T'HH:mm:ss  
  
########################################### Fill me in! ###########################################  
project=coinone-data  
defaultDataset=serverlog  
keyfile=/mnt/secret-manager/KRPRD-SVA-BIGQUERY-MSK  
topic2TableMap=EVENT.USER.SIGNUP_COMPLETE:serverlog_kafka,EVENT.USER.BANK_ACCOUNT_REGISTRATION:serverlog_kafka,EVENT.USER.BANK_ACCOUNT_DEREGISTRATION:serverlog_kafka,EVENT.AML.KYC_PHONE_AUTH:serverlog_kafka,EVENT.AML.KYC_IDCARD_AUTH:serverlog_kafka,EVENT.AML.KYC_BANK_ACCOUNT_AUTH:serverlog_kafka,EVENT.AML.KYC_CDD_EDD_AUTH:serverlog_kafka,EVENT.AML.KYC_COMPLETE:serverlog_kafka,EVENT.AML.KYC_SAVEPOINT_RESET:serverlog_kafka,EVENT.AML.REVISION_REQUEST_CDD_EDD_AUTH:serverlog_kafka,EVENT.AML.REKYC_CDD_EDD_AUTH:serverlog_kafka,EVENT.USER.BALANCE_TRANSFER_COMPLETE:serverlog_kafka
bigQueryPartitionDecorator=false  
timestampPartitionFieldName=ce_time
bigQueryRetry=5
bigQueryRetryWait=10000
```