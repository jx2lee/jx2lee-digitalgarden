---
{"dg-publish":true,"permalink":"/data/rdb/__/null vs empty string/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#database #mysql

---
## overview

많은 사람들이 NULL 은 MySQL 빈 문자열(empty string)과 같다고 생각한다. 이로 인해 NULL과 빈 문자열의 개념은 종종 혼란스럽게한다.
- 두 값의 의미는 다음과 같이 해석할 수 있다.
	- 상황은 다음과 같다. 회원 테이블의 휴대전화 번호를 삽입할 경우, null 과 empty string 을 사용할 수 있다.
	- null: 알 수 없는 전화번호로 해석할 수 있다.
	- empty string: **사용자에게 전화번호가 없다** 라고 해석할 수 있다.

# reference

- [alibaba Cloud: When to Use NULL and When to Use Empty String](https://www.alibabacloud.com/blog/when-to-use-null-and-when-to-use-empty-string_598579)