---
{"dg-publish":true,"permalink":"/etc/Java/Early return/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---



# before

```java
public String returnStuff(SomeObject argument1, SomeObject argument2) {
if (argument1.isValid()) {
	if (argument2.isValid()) {
		SomeObject otherVal1 = doSomeStuff(argument1, argument2)
		if (otherVal1.isValid()) {
			SomeObject otherVal2 = doAnotherStuff(otherVal1)
				if (otherVal2.isValid()) {
					return "Stuff";
				} else {
					throw new Exception();
				}
			} else {
				throw new Exception();
			}
		} else {
			throw new Exception();
		}
	} else {
		throw new Exception();
	}
}
```
# after

```java
public String returnStuff(SomeObject argument1, SomeObject argument2){
	if (!argument1.isValid()) {
		throw new Exception();
	}
	
	if (!argument2.isValid()) {
		throw new Exception();
	}

	SomeObject otherVal1 = doSomeStuff(argument1, argument2);

	if (!otherVal1.isValid()) {
		throw new Exception();
	}

	SomeObject otherVal2 = doAnotherStuff(otherVal1);

	if (!otherVal2.isValid()) {
		throw new Exception();
	}

	return "Stuff";
}
```

> "결과를 할당하는 것”은 “이게 최종 값이며, 처리는 여기서 멈춘다”라는 의도를 설명하지 않으며, “이 결과는 완료된거야? 수정할 수 있는거야?”라는 질문을 남기고, 결과를 수정하는 실수를 허용하기도 한다. 그러므로 함수가 더 이상 의미있는 동작을 하지 않는다는 것을 알자마자 반환하고, `if/else` 대신에 `if/return` 구조를 사용하여 들여쓰기를 최소한으로 줄이자.

- early return 패턴은 함수가 혼동되는 것을 방지하는 훌륭한 방법
- 그러나 이것이 매번 적용될 수 없다.
	- 때때로 복잡한 비즈니스 로직 중에 코드를 다른 기능으로 추출하는 옵션이 있더라도 일부 중첩된 `if-else` 는 피할 수 없다.