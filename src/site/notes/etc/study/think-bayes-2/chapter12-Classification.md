---
{"dg-publish":true,"permalink":"/etc/study/think-bayes-2/chapter12-Classification/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#think-bayes #probability #study

---

# Penguin Data

> 동일한 종의 경우 분산이 작아 분류에 사용하기 매우 유용하다.
> -> 분산이란 확률변수가 기댓값으부터 얼마나 떨어져 있는 곳에 분포하는지를 가늠하는 숫자이다. 같은 종의 펭귄들의 특정 값에 대한 분산이 작다는 것은, 종을 특징한 값으로 표현할 수 있기 때문에 분류에 용이하다고 저자가 이야기한 것으로 추측할 수 있다.

> 정규분포 특징과 시그모이드
> - features
> 	- 평균, 중앙값(median) 및 mode 는 동일하다.
> 	- 분포는 평균에 대해 대칭을 이루며, 절반은 평균보다 낮고 절반은 평균보다 높다.
> 	- 분포는 평균(mean)과 표준 편차(standard deviation)라는 두 가지 값으로 설명할 수 있다.
> - sigmoid
> 	- **시그모이드 함수**는 S자형 곡선 또는 **시그모이드 곡선을** 갖는 [수학 함수](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98 "함수")이다. 시그모이드 함수의 예시로는 [로지스틱 함수](https://ko.wikipedia.org/wiki/%EB%A1%9C%EC%A7%80%EC%8A%A4%ED%8B%B1_%ED%95%A8%EC%88%98 "로지스틱 함수")가 있으며 다음 수식으로 정의된다.
> 		- ${\displaystyle S(x)={\frac {1}{1+e^{-x}}}={\frac {e^{x}}{e^{x}+1}}}$
> 		- logistic function
> 			- ![](https://i.imgur.com/CBuSSij.png)
> 	- definition
> 		- 시그모이드 함수는 실함수로써 유계이고 미분가능하며, 모든 점에서 음이 아닌 미분값을 가지고 단 하나의 변곡점을 가진다.

# Normal Models

# The Update

> 확률밀도와 확률간 관계
> - 직접 설명하는 것 보단 링크를 참고하면 도움이 될 것 같다. 이전시간에 교영님이 설명해준 내용도 함께 참고하면 더 좋을 것 같다.
> - https://actuary.skku.edu/actuarial/roadmap2.do?mode=download&articleNo=111941&attachNo=81385

# Naive Bayesian Classification
# Joint Distributions
# Multivariate Normal Distribution
# Visualizing Normal Distribution
# A Less Naive Classifier
# Summary
# EOD