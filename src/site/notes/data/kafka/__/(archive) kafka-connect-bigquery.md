---
{"dg-publish":true,"permalink":"/data/kafka/__/(archive) kafka-connect-bigquery/"}
---


### kinesis - lambda 스키마
---

| name                        | type      | mode     |
| --------------------------- | --------- | -------- |
| sequenceNumber              | STRING    | NULLABLE |
| aws_request_id              | STRING    | NULLABLE |
| approximateArrivalTimestamp | TIMESTAMP | NULLABLE |
| data                        | STRING    | NULLABLE |

- [sequenceNumber](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#sequence-number): kinesis 의 유니크 파티션키
- aws_request_id: lambda 요청 ID
- [approximateArrivalTimestamp](https://docs.aws.amazon.com/ko_kr/kinesis/latest/APIReference/API_Record.html): kinesis 스트림에서 레코드가 저장된 시점의 timestamp
- data: 레코드 (json format)
    - keys: event_type, version, useridx, timestamp, body(event 별 message body)


### plan
- target table 스키마 설계
    - background
        - EDA 도입 후 카프카에서 데이터를 소비하기 위한 작업을 진행중이다.
        - 빅쿼리 테이블로 적재 시 스키마를 어떻게 설정할 지 결정한다.
    - supoorted data type
        - [kafka-connect-bigquery]() 로 메세지를 빅쿼리 테이블로 적재할 때, 
    ```
    CREATE TABLE
      {dataset}.serverlog_kafka (
        value STRING,
        _headers STRUCT <
          ce_type STRING,
          ce_source STRING,
          ce_specversion STRING,
          ce_time STRING,
          ce_id STRING,
          ce_subject STRING
    >    
    )
    PARTITION BY
      TIMESTAMP_TRUNC(_PARTITIONTIME, DAY) ;
    ```
- 토픽 대 테이블 연관관계 설정
    - N:1
    - [PR](https://github.com/confluentinc/kafka-connect-bigquery/pull/361) 생성
- 싱크에 실패한 메세지 재처리를 위한 로직 만들기
- CICD 구성 (github)
- kafka to bigquery 로컬 테스트