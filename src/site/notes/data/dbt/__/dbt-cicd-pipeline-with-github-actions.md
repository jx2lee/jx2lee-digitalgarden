---
{"dg-publish":true,"permalink":"/data/dbt/__/dbt-cicd-pipeline-with-github-actions/","created":"","updated":""}
---


### 배경
- 사내 github 이 도입되었다.
- Atlassian bamboo & Airflow 를 조합한 cicd 파이프라인에 불필요한 단계들이 많다. 이를 개선하고 Github Actions 로 마이그레이션이 필요하다.


### 목적
- dbt cicd 파이프라인을 개선한다.


### 개선 지표
- (전환 이전) 성공 빌드 / 전체 빌드
- (전환 이후) 성공 빌드 / 전체 빌드
	- 단, 전환 전/후 빌드의 사용자 오류는 제외한다.


### 목표
- 기존 dbt CICD 파이프라인(bamboo)을 Github Actions 로 이관한다.
- 기존 파이프라인이 정상동작한다.
	- dbt slim ci/full build
	- lightdash deploy
- 기존과 더불어 Github Actions 을 활용한 다양한 Workflow 를 추가한다.

### troubleshoot
- EKS cluster <-> s3 연동

### relates to..
[[data/dbt/__/github-actions-in-data\|Actions 을 어떻게 활용하나요 in dbt]]