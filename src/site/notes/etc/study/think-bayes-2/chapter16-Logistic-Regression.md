---
{"dg-publish":true,"permalink":"/etc/study/think-bayes-2/chapter16-Logistic-Regression/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#think-bayes #probability #study 

---

==overview==
- Bayes's Rule on a logarithmic scale
- logistic regression

# Log Odds
> 계산이론 문제

$$O(H|F) = O(H) \frac{P(F|H)}{P(F|not H)}$$
- H: 강의실을 제대로 찾아갔다
- F: 도착 후 강의실에서 들어온 사람은 여학생이다.
- val
	- $O(H) = \frac{1}{10}$
	- $P(F|H) = \frac{17}{100}$
	- $P(F|not H) = \frac{53}{100}$
	- $\frac{P(F|H)}{P(F|not H)} = 17 / 50$
- 위 val 로 posterior odds 를 계산할 수 있다.
	- $O(H|F) = 10 / 3$
	- $O(H|FF) = 10 / 9$
	- $O(H|FFF) = 10 / 27$
	- 계산을 쉽게 하기 위해 likelihood ratio 는 $\frac{1}{3}$ 이라고 가정한다.
- likelihood ratio 는 일정하지만 확률 변동 정도는 다르다.

![](https://i.imgur.com/a1Gr7V3.png)

odds 에 log 를 취해본다.

![](https://i.imgur.com/6zTFoJV.png)
- 해석
	- prob > 0.5
		- odds > 1 && log odds > 0
	- prob < 0.5
		- odds < 1 && log odds < 0
	- log odds diff 간 차이는 동일하다.

$$\log O(H|F) = \log O(H) + \log \frac{P(F|H)}{P(F|not H)}$$
$$\log O(H|F^x) = \log O(H) + x \log \frac{P(F|H)}{P(F|not H)}$$

$$\log O(H | x) = \beta_0 + \beta_1 x$$
- $\beta_0$ and $\beta_1$ are unknown parameters
	- $\beta_0$ 는 절편으로 x=0 일 때의 log odds val
	- $\beta_1$ 는 기울기로 log of likelihood ratio
- This equation is the basis of logistic regression.

# The Space Shuttle Problem
