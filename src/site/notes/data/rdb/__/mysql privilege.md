---
{"dg-publish":true,"permalink":"/data/rdb/__/mysql privilege/","dgPassFrontmatter":true,"created":"","updated":""}
---


#rdb #MySQL #privilge

---

- datahub information 스키마를 이용한 메타데이터 추출 개발 중 `references` 권한을 가진 user 를 사용
	- [참고](https://tech.socarcorp.kr/data/2022/03/16/metdata-platform-02.html)
	- datahub 에서 메타데이터 추출 시 테이블에 대한 select 권한이 필요함
- mysql privilege 중 하나인 references 권한에 대해 간단히 정리하고자 함

# references
- 정의: **외래 키 제약 조건 생성을 위한 권한**
	- 상위 테이블에 대한 REFERENCES 권한 필요

# replicate
## replicate client
- SHOW MASER STATUS/SHOW SLAVE STATUS 문을 실행할 수 있는 권한

## replicate slave
- user 가 master 와 연결하고 master bin log 에 대한 업데이트 내역을 확인할 수 있는 권한

## 그래서 둘 권한의 차이는?


# ref
- [https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_references](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_references)
- [The Replication User Account](https://www.oreilly.com/library/view/mysql-in-a/9780596514334/ch08s03.html)