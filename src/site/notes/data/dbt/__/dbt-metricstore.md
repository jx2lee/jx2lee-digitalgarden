---
{"author":"jx2lee","aliases":null,"created":"2023-12-20 00:33","last-updated":"2024-02-24 22:39","tags":["dbt","metricstore","sad"],"dg-publish":true,"dg-home-link":false,"dg-show-local-graph":true,"dg-show-backlinks":true,"dg-show-toc":false,"dg-show-inline-title":false,"dg-show-file-tree":false,"dg-enable-search":true,"dg-link-preview":true,"dg-show-tags":true,"dg-pass-frontmatter":true,"permalink":"/data/dbt/__/dbt-metricstore/","dgPassFrontmatter":true,"dgShowBacklinks":true,"dgShowLocalGraph":true,"dgEnableSearch":true,"dgLinkPreview":true,"dgShowTags":true}
---


> [!tldr] 자유도 높은 슬랙과 결합한 지표저장소를 제공한다.

### 배경


- [dbt-metric](https://github.coinfra.net/coinone/dbt-metric) 을 통해 코인원 지표 저장소를 1년 넘게 운영해왔다.
- dbt v1.6 이후에는 지표 저장소에 사용한 dbt_metrics 패키지 지원을 중단한다고 발표했다.
    - [https://docs.getdbt.com/blog/deprecating-dbt-metrics](https://docs.getdbt.com/blog/deprecating-dbt-metrics)
- Analytics Engineer 를 제외하고 지표들을 생성하고 관리하는 자유도가 낮다.
    

### 목적


코인원 지표저장소를 개선한다.

### 개선 지표


TBD

### 목표


- 이전 표저장소에서 제공한 기능을 동일하게 제공한다.
- 보다 많은 크루들이 지표장소를 활용할 수 있도록 한다.
- 현 지표저장소의 문제를 개선한다.


### 더보기

- Software Architecture Documentation
    - [[data/dbt/__/dbt-metricstore-sad-current-status\|SAD - Current status]]
    - [[data/dbt/__/dbt-metricstore-sad-toplevel-module-uses-view\|SAD - Top Level Module Veiw]]
    - [[data/dbt/__/dbt-metricstore-sad-cnc-view\|SAD - C&C View]]
    - [[data/dbt/__/dbt-metricstore-deployment-view\|SAD - Deployment View]]