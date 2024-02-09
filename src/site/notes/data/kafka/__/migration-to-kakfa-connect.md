---
{"dg-publish":true,"permalink":"/data/kafka//migration-to-kakfa-connect/","tags":["kafka","connect"]}
---



> [!tldr] 
> kafka connect 를 이용한 파이프라인 마이그레이션 (kinesis & lambda to kafka connect)


### 배경


- 백엔드 회원 파트에 EDA 작업이 완료되었다. event driven architecture 로 전환하며 카프카를 활용한다.
- AWS Kinesis 로 발행하는 이벤트는 이후 deprecated 될 예정이다. Kinesis 로 발행한 메세지는 lambda 를 통해 BigQuery 에 실시간으로 적재되고 있다.
- 이에 맞춰 Kafka 메세지를 BigQuery 로 적재하도록 이사가 필요하다.


### 목적


**Kinesis & Lambda 서버로그 파이프라인을 kafka connect 로 이관한다.**


### 개선 지표


TBD


### 목표


- 회원 관련 이벤트를 kafka connect 를 이용한 파이프라인으로 이관한다.
- 적재실패 시 모니터링 & 재처리 로직을 설계한다.
    - ex. Kinesis lambda 파이프라인의 경우 적재를 시도하는 람다 실패 시 슬랙으로 알람을 발송하고 있다.


### 더보기


- [[data/kafka/__/migration-target-schema\|[migrate-to-kakfa-connect] 빅쿼리로 적재할 테이블 스키마]]
- [[data/kafka/__/migration-used-packages\|[migrate-to-kafka-connect] 사용중인 커넥터 & 트랜스폼]]
- [[data/kafka/__/migration-error-handling\|[migrate-to-kafka-connect] 적재 실패 메세지의 처리 방안]]
- [[data/kafka/__/migration-connector-cicd\|[migrate-to-kafka-connect] 커넥터 CI/CD]]
- [[data/kafka/__/migration-connector-properties\|[migrate-to-kafka-connect] Connector Properties]]


<details>
    <summary>일별 이벤트 수 비교 쿼리</summary>
    <pre>
    WITH kafka AS (
      SELECT
        lower(SPLIT(ce_subject, '.')[SAFE_OFFSET(2)]) AS event_type,
        COUNT(ce_subject) AS cnt
      FROM
        `coinone-data-dev.serverlog.serverlog_kafka`
      WHERE
        TIMESTAMP_TRUNC(ce_time, DAY) = '2023-11-27'
      GROUP BY
        1
    ),
    
    lambda AS (
      SELECT
        event_type,
        COUNT(event_type) AS cnt
      FROM
        `coinone-data-dev.dbt_metric.stg_serverlog_lambda`
      WHERE
        TIMESTAMP_TRUNC(approximate_arrival_timestamp, DAY) = '2023-11-27'
      GROUP BY
        event_type
    )
    
    SELECT
      COALESCE(kafka.event_type, lambda.event_type) AS event_type,
      COALESCE(kafka.cnt, 0) AS count_kafka,
      COALESCE(lambda.cnt, 0) AS count_lambda
    FROM
      kafka
    FULL OUTER JOIN
      lambda
    USING (event_type);
    </pre>
</details>
