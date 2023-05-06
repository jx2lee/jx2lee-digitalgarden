---
{"dg-publish":true,"permalink":"/etc/study/think-bayes-2/chapter07-Minimum,Maximum,Mixture/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#think-bayes #probability #study

---

이번 장에서는 분포 최소값과 최대값을 계산하고 이를 사용해 정방향 문제와 역방향 문제를 풀어본다.

그런 다음 예측을 할 때 다른 분포가 혼합된 분포를 살펴본다.

먼저 분포 작업을 위해 강력한 도구인 누적 분포 함수(cumulative distribution function)를 살펴보자.

# Culmulative Distribution Functions
지금까지는 확률 질량 함수(pmf)를 사용하여 분포를 표현했다. pmf 대안으로 누적 분포 함수(CDF)를 사용할 수 있다.

예를 들어, <<\_BayesianEstimation>>에서 계산한 유로 문제의 사후 분포를 사용해본다.

다음은 우리가 사용한 uniform prior 다.
```python
>>> import numpy as np
>>> from empiricaldist import Pmf
>>> 
>>> hypos = np.linspace(0, 1, 101)
>>> pmf = Pmf(1, hypos)
>>> data = 140, 250
```

update 는 다음과 같이 진행한다.
```python
from scipy.stats import binom

def update_binomial(pmf, data):
    """Update pmf using the binomial distribution."""
    k, n = data
    xs = pmf.qs
    likelihood = binom.pmf(k, n, xs)
    pmf *= likelihood
    pmf.normalize()

>>> update_binomial(pmf, data)
```

CDF는 PMF의 누적 합계이므로 다음과 같이 계산한다.
```python
>>> cumulative = pmf.cumsum()
>>> cumulative
0.00     0.000000e+00
0.01    1.256330e-207
0.02    5.731921e-166
0.03    8.338711e-142
0.04    8.269265e-125
            ...      
0.96     1.000000e+00
0.97     1.000000e+00
0.98     1.000000e+00
0.99     1.000000e+00
1.00     1.000000e+00
Name: , Length: 101, dtype: float64
```

![](https://i.imgur.com/ppnDYcm.png)

CDF의 범위는 항상 0에서 1 사이다. (*최대값이 임의의 확률이 될 수 있는 PMF와 대조된다*)

cumsum의 결과는 판다 시리즈이므로 괄호 연산자를 사용하여 요소를 선택할 수 있다.

```python
>>> cumulative[0.61]
0.9638303193984255
```

- 해석
	- 결과는 약 0.96으로, 모든 수량이 0.61보다 작거나 같을 확률이 총 96%임을 의미합니다.

다른 방법으로, 확률을 조회하고 해당 사분위수를 구하려면 보간법(interpolation)을 사용하면 된다.

```python
>>> from scipy.interpolate import interp1d
>>> 
>>> ps = cumulative.values
>>> qs = cumulative.index
>>> 
>>> interp = interp1d(ps, qs)
>>> interp(0.96)
array(0.60890171)
```

- 해석
	- 결과는 약 0.61이므로 이 분포의 96 백분위수가 0.61 이다.
