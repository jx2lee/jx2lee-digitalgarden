---
{"dg-publish":true,"permalink":"/etc/study/think-bayes-2/chapter10-Testing/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#think-bayes #probability #study

---

유로 동전 데이터 문제를 살펴보자.
문제에 대한 답으로 이 데이터가 동전이 한 쪽으로 기울었다는 것의 증거가 될까? 라는 질문에 답은 못했다. 이 챕터에서 답변을 들어본다.

# Estimation
```python
import numpy as np
from empiricaldist import Pmf
from scipy.stats import binom

xs = np.linspace(0, 1, 101)
uniform = Pmf(1, xs)

k, n = 140, 250
likelihood = binom.pmf(k, n, xs)

posterior = uniform * likelihood
posterior.normalize()
```

![](https://i.imgur.com/wOOjmRM.png)

posterior 평균은 0.56 이고 90% credible interval 은 0.51 ~ 0.61 이다.

```python
print(posterior.mean(), 
      posterior.credible_interval(0.9))
0.5595238095238094 [0.51 0.61]
```

# Evidence
올리버의 혈액형 문제를 떠올려보자.

$$P(D|A) > P(D|B)$$
- A(가설): 올리버가 현장에 혈흔을 남겼다.
- B(가설): 올리버가 현장에 혈흔을 남기지 않았다.
- D: 올리버가 범인이다.
- D|A: 현장에 혈흔을 남겼을 때 올리버가 범인이다.
- D|B: 현장에 혈흔을 남기지 않았을 때 올리버가 범인이다.

$$K = \frac{P(D|A)}{P(D|B)}$$

올리버의 혈액형 문제와 같이 유로 동전 문제를 fair 와 biased 두 가지 가설을 고려하여 likelihood 를 계산해본다.

```python
k = 140
n = 250

like_fair = binom.pmf(k, n, p=0.5)
like_fair
0.008357181724918204
```

이제 동전이 한 쪽으로 기울어졌다고 가정했을 때 이 데이터가 나올 likelihood 를 계산해보자. 만약 **치우치다**의 의미각 앞면이 56% 나올 확률이라고 알고 있었다면, 다음과 같이 이항분포를 사용할 수 있다.
```python
like_biased = binom.pmf(k, n, p=0.56)
like_biased
0.05077815959518337
```

bayes factor 를 구하면 다음과 같다.
```python
K = like_biased / like_fair
K
6.075990838368465
```

- 1보다 크기 때문에 동전이 한 쪽으로 치우졌을 가능성이 약 6배 높다.
- 허나 위 과정에서 가정을 데이터를 컨팅하듯 사용했다.
	- 앞면이 56% 나올 확률이라고 이미 나온 데이터를 기반으로 가정을 했다.
- **치우치다 의 정의가 필요하다.**

# Uniformly Distributed Bias
- 치우치다 라는 의미를 앞면이 나올 확률이 50%가 아닐것이라 하고 다른 값이 나올 가능성이 동일하다고 가정해보자.
	- Hypo: 동전이 치우치다는 의미는50% 확률이 아니고 다른 확률이 나올 가능성은 동일하다.
- uniform 을 생성하고 50% 영역을 삭제하면 다음과 같다.
```python
biased_uniform = uniform.copy()
biased_uniform[0.5] = 0
biased_uniform.normalize()
```
- 전체 확률은 다음과 같다.
```python
xs = biased_uniform.qs
likelihood = binom.pmf(k, n, xs)

like_uniform = np.sum(biased_uniform * likelihood)
like_uniform
0.0039004919277707355 # 균등하게 치우친(확률이 50%인) 가설 하에서의 확률

K = like_fair / like_uniform
K
2.142596851801362 # fair 가 biased 할 경우보다 likelihood 가 높다.
```

evidence 의 강력함을 확인하기 위해 Bayes's Rule 를 적용해보자.

```python
prior_odds = 1 # prior: 50% 이면 prior odds 는 1
posterior_odds = prior_odds * K 
posterior_odds
2.142596851801362

def prob(o):
    return o / (o+1)

posterior_probability = prob(posterior_odds)
posterior_probability
0.6817918278551091 # 50% -> 68%, 약하다 약해
```




# EOD
- 베이지안 벤딧 전략은 posterior 를 의사결정 과정의 일부로 사용하는 전략 중 하나이다.
- 이러한 strategy 는 전통적인 통계방법론 대비 베이지안 방법론이 가진 장점이다.
