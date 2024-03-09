---
{"dg-publish":true,"permalink":"/data/rdb/__/trigger/"}
---


### trigger
[document](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
> A trigger is a named database object that is associated with a table, and that activates when a particular event occurs for the table. Some uses for triggers are to perform checks of values to be inserted into a table or to perform calculations on values involved in an update.
> 
> A trigger is defined to activate when a statement inserts, updates, or deletes rows in the associated table. These row operations are trigger events. For example, rows can be inserted by INSERT or LOAD DATA statements, and an insert trigger activates for each inserted row. A trigger can be set to activate either before or after the trigger event. For example, you can have a trigger activate before each row that is inserted into a table or after each row that is updated.

- 테이블과 연결된 데이터베이스 객체(object)
- 테이블에 대한 **특정 이벤트가 발생할 때 활성화**
- **용도**
	- 테이블에 삽입할 값을 확인하거나 업데이트와 관련된 값에 대한 계산
- trigger 는 연결된 테이블의 행의 삽입, 업데이트 또는 삭제할 때 활성화되도록 정의
	- 이러한 행 작업을 트리거 이벤트(trigger event)
	- 예를 들어 INSERT 또는 LOAD DATA 문으로 행을 insert 할 때 삽입된 각 행에 대해 삽입 트리거(insert trigger)가 활성화됨
- trigger event 전후로 trigger 가 활성화되도록 설정할 수 있음
	- 예를 들어 테이블에 새로운 행이 insert 되기 전 활성화하거나,
	- 업데이트되는 각 행 이후에 트리거가 활성화되도록 설정할 수 있음

### example `mysql trigger command`
```sql
-- trigger 출력
show triggers;

-- member 로우가 변경되면 동일한 member_id 를 갖는 member_salary_receipt 로우도 변경하는 trigger query
CREATE TRIGGER update_member_name
AFTER UPDATE ON member
FOR EACH ROW
BEGIN
    IF NEW.name != OLD.name THEN
        UPDATE member_salary_receipt
        SET name = NEW.name
        WHERE member_id = NEW.member_id;
    END IF;
END
```