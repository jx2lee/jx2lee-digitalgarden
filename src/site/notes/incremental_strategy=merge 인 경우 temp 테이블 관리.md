---
{"dg-publish":true,"permalink":"/incremental_strategy=merge 인 경우 temp 테이블 관리/","dgPassFrontmatter":true}
---

#dbt #troubleshooting 

```toc
```

---

# background
- dbt model 중 `incremental_strategy=merge` 인 경우 `__dbt_tmp` 테이블을 생성한다.
	- 기본 만료시간이 12시간으로 설정한다.
- bigquery 혹은 카탈로그 서비스를 이용하는 사용자들의 위 테이블 문의가 증가하고 있다.
- merge 케이스의 경우 temp 테이블 생성에 대한 관리가 필요해졌다.

# [incremental strategy](https://docs.getdbt.com/docs/build/incremental-models#about-incremental_strategy) in dbt

> 일부 adapter 에 incremental_strategy 옵션은 dbt가 증분 모델(incremental model)을 빌드하는 데 코드를 제어한다. 데이터 양, unique_key의 신뢰성 또는 가용성에 따라 접근 방식이 다를 수 있다.

dbt 에서 제공하는 incremental 모델을 이용할 때 사용하는 옵션이다. dbt model 은 기본적으로 full-refresh 전략을 취한다. 이는 모델 빌드 시 destination 테이블을 삭제하고 새롭게 생성하는데, 자세한 내용과 advantages 는 아래 그림의 링크를 참고하자.

![](https://i.imgur.com/N8N5mUZ.png)

하지만 위 full refresh 전략은 비효율적이다. 매번 destination 테이블을 삭제하고 재생성하기 때문이다. 비용을 절감하거나, 속도를 높여야 하거나, 테이블이 새 데이터를 자주 확인하거나(e.g 일마다 새로운 데이터가 적재된 경우), dbt를 사용하는 것이 편하다면 incremental 모델을 고려해야한다. 기본적으로 제공하는 incremental 전략들이 존재하고 adpater 마다 약간의 동작이 다를 수 있으니 adapter 상세 config 를 살펴보는 것이 좋다.

제공하는 strategy 에 대해 설명이 잘되어 있는 링크를 아래 남겨두니 자세한 내용은 [링크](https://medium.com/indiciumtech/understanding-dbt-incremental-strategies-part-1-2-22bd97c7eeb5)를 확인해보자. merge 전략으로 incremental 모델 생성 흐름은 아래와 같다.

![](https://i.imgur.com/YEWL6ET.png)


# what's wrong

merge 옵션으로 incremental 모델을 생성할 때 기존 destination 모델을 이용해 temp 테이블을 생성한다 (with `__dbt_tmp` suffix). strategy 가 insert_overwrite 인 경우에는 생성한 temp 테이블을 삭제하는 쿼리가 컴파일로 확인가능하지만, merge 인 경우 생성한 temp 테이블을 Drop 하는 쿼리를 확인할 수 없었다.

```
코드 예시로 회사에서 작성 예정
```

혹시나 merge strategy 시 temp table 을 삭제하지 않는 원인이 궁금하여 커뮤니티에 [질문](https://getdbt.slack.com/archives/CBSQTAPLG/p1674915934074389)해보았다.