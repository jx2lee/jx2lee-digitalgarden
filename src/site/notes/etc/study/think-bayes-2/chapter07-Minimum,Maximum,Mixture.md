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

empiricaldist 는 누적 분포 함수를 나타내는 Cdf 클래스를 제공한다. Pmf가 주어지면 다음과 같이 Cdf를 계산할 수 있다.

```python
>>> cdf = pmf.make_cdf()
```

make_cdf는 np.cumsum을 사용하여 확률의 누적 합계를 계산한다.

```python
>>> cdf[0.61]
0.9638303193984255
```

그러나 분포에 없는 수량을 조회하면 KeyError가 발생한다. 이 문제를 방지하려면 괄호를 사용하여 Cdf 를 함수로 호출할 수 있다. 인수가 Cdf에 나타나지 않으면 수량 간에 보간된다.

```python
>>> cdf(0.615)
array(0.96383032)
```

다른 방법으로 quantile 를 사용해 누적 확률을 조회하고 해당 수량을 얻을 수 있다.

```python
>>> cdf.quantile(0.9638303)
array(0.61)
```

Cdf는 또한 주어진 확률을 포함하는 신뢰구간을 계산하는 `credible_interval` 을 제공한다.

```python
>>> cdf.credible_interval(0.9)
array([0.51, 0.61])
```

CDF와 PMF는 동일한 정보를 제공한다는 점에서 동일하며, 언제든지 둘 중 하나에서 다른 것으로 변환할 수 있다. CDF가 주어지면 다음과 같이 동등한 PMF를 얻을 수 있다.

```python
>>> pmf = cdf.make_pmf()
```

make_pmf는 np.diff를 사용하여 연속 누적 확률 간 차이를 계산하여 pmf 를 반환한다. 
  
Cdf 객체가 유용한 이유 중 하나는 사분위수를 효율적으로 계산하기 때문이다. 또 다른 이유는 다음 섹션에서 살펴볼 것처럼 최대값 또는 최소값의 분포를 쉽게 계산할 수 있다.

# Best Three of Four
던전앤드래곤에서 각 캐릭터는 힘, 지능, 지혜, 민첩, 체질, 카리스마 등 여섯 가지 속성을 가지고 있다.

새로운 캐릭터를 생성하려면 각 속성에 대해 6면 주사위 4개를 굴려서 가장 좋은 3개를 합산한다. 예를 들어 힘의 경우 주사위를 굴려서 1, 2, 3, 4가 나오면 캐릭터의 힘은 2, 3, 4의 합 **9**가 된다.

연습 삼아 위 분포를 알아보자. 그런 다음 각 캐릭터에 대해 가장 좋은 속성의 분포를 알아낼 것이다.

이전 장에서 주사위를 굴린 결과를 나타내는 Pmf를 만드는 make_die 함수와 Pmf 객체의 시퀀스를 가져와 그 합의 분포를 계산하는 add_dist_seq 함수를 이용한다.

다음은 6면 주사위와 이에 대한 3개의 참조가 있는 시퀀스를 나타내는 Pmf 다.

```python
>>> from utils import make_die
>>> 
>>> die = make_die(6)
>>> dice = [die] * 3
```

세 주사위 합 분포를 계산한다.
```python
>>> from utils import add_dist_seq
>>> 
>>> pmf_3d6 = add_dist_seq(dice)
```

![](https://i.imgur.com/yXTG7HJ.png)

주사위 4개를 굴려 가장 좋은 3개를 더하는 합계 분포를 계산하는 것은 조금 더 복잡하다. 10,000번 주사위 굴림을 시뮬레이션하여 분포를 추정해 본다.
  
먼저 10,000개 행과 4개 열로 구성된 1에서 6까지의 임의의 값 배열을 만든다.

```python
n = 10000
a = np.random.randint(1, 7, size=(n, 4))
```

각 행에서 상위 결과 세 개를 찾기 위해 행을 오름차순으로 정렬하고 3개 값을 가져온다. (to `t`)
```python
>>> a.sort(axis=1)
>>> t = a[:, 1:].sum(axis=1)
```

pmf 객체로 생성하고 이를 그래프화 해보면 다음과 같다.

```python
>>> pmf_best3 = Pmf.from_seq(t)
```

![](https://i.imgur.com/8mn9woI.png)

4개 중 가장 좋은 3개를 선택하는 것이 더 높은 pmf 값을 생성하는 경향이 있다.  
  
다음으로 4개의 주사위 중 가장 좋은 3개의 합으로 이루어진 최대 6개의 속성에 대한 분포를 구해 본다.

# Maximum