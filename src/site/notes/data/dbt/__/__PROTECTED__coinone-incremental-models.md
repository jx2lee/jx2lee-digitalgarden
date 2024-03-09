---
{"dg-publish":true,"permalink":"/data/dbt/__/__PROTECTED__coinone-incremental-models/","tags":["dbt","incremental"]}
---


### 증분 모델 현황

- incremental(이하 증분) 모델 `34개`
    - common: 14
    - common_account: 6
    - common_balance: 2
    - common_order: 3
    - common_trade: 4
    - mart: 5
- 증분 모델에서 current_date/timestamp 를 파티션 컬럼에 사용하는 모델  `5개`
    - dev 에서 사용하는 경우는 제외했습니다.
    - common
        - `prep_app_event_param`
    - common_account
        - `prep_login`: get_last_updated_ts 매크로 사용 중 current_timestamp 사용
    - common_trade
        - `prep_tradepair`
    - mart
        - `mart_growth_model_base`


### 개선방안


```
prep_app_event_param
prep_login
mart_growth_model_base
prep_tradepair
```


금번 깃헙 장애로 영향받은 모델의 원인은 "증분모델 파티션 키에 current_date/timestamp 을 설정한 것이다.
- 이런 문제를 가진 모델은 prep_tradepair 뿐
- 나머지 모델들은
    - 모델 파티션 키에 current 를 사용하지 않고,
    - 필터링 과정에서 current_date/timestamp 를 이용해 장애가 오래발생할 수 있을 것을 대비했다.
- 그럼 나머지 모델들(prep_tradepair 외 증분 모델)도 고쳐야 하는가?
    - 나머지 모델들은 이번 장애에도 크게 문제될 일이 없습니다. (prep_login 제외)
    - 나머지 모델들은 수정하지 않아도 좋다고 생각합니다.
- 결론
    - prep_tradepair 와 prep_login 모델을 수정한다.
        - prep_login 모델 개선에 대한 티켓은 존재한다.
        - prep_tradepair 모델 개선에 대한 티켓은 생성하고 진행한다.