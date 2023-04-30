---
{"dg-publish":true,"permalink":"/etc/study/think-bayes-2/chapter05-Estimating-Counts/","dgPassFrontmatter":true,"noteIcon":"","created":"","updated":""}
---

#think-bayes #probability #study

---

이 장에서는 인구 수를 세거나 인구의 크기를 추정하는 것과 관련된 문제를 다룬다. 다시 말하지만, 일부 예제는 우스꽝스러워 보일 수 있지만 독일 탱크 문제와 같은 일부 예제는 때로는 삶과 죽음의 상황에서 실제 적용이 가능하다.

# The Train Problem
> "철도는 기관차에 1...N 순서로 번호를 매깁니다. 어느 날 번호가 60인 기관차를 보게 됩니다. 철도에 몇 대의 기관차가 있는지 추정하세요."

- 이 관찰을 바탕으로 우리는 철도에 60개 이상의 기관차가 있다는 것을 알고 있다.
- 하지만 몇 대가 더 있을까? 베이지안 추론을 적용하기 위해 이 문제를 두 단계로 나눌 수 있습니다.
	- 데이터를 보기 전에 N 에 대해 무엇을 알고 있었습니까?
	- 주어진 N 값에 대해 데이터(60번 기관차)를 볼 확률은 얼마인가?  
- **첫 번째 질문에 대한 답은 prior 이다.**
- **두 번째 질문에 대한 답은 likelihood입니다.**
  
prior 을 선택할 근거가 많지 않으므로 간단한 것부터 시작한 다음 대안을 고려해본다. N 이 1에서 1000 사이의 모든 값일 가능성이 똑같다고 가정해보자.  
  
사전 분포를 구해본다.

```python
import numpy as np
from empiricaldist import Pmf

hypos = np.arange(1, 1001)
prior = Pmf(1, hypos)
```

이제 데이터의 likelihood 을 알아보자. 𝑁 기관차로 구성된 차량에서 60번 기관차를 볼 확률은 얼마인가? 모든 기관차를 볼 확률이 똑같다고 가정하면 특정 기관차를 볼 확률은 1/𝑁 이다.

다음은 업데이트를 수행하는 함수이다.

```python
def update_train(pmf, data):
    """Update pmf based on new data."""
    hypos = pmf.qs
    likelihood = 1 / hypos
    impossible = (data > hypos)
    likelihood[impossible] = 0
    pmf *= likelihood
    pmf.normalize()
```

이 함수는 이전 장의 주사위 문제에 대한 업데이트 함수와 동일하다. 확률 측면에서 기차 문제는 주사위 문제와 비슷하다.

업데이트는 다음과 같다.
```python
data = 60
posterior = prior.copy()
update_train(posterior, data)
```

![](https://i.imgur.com/yRHXuQz.png)
당연히 60 미만의 𝑁 값은 모두 제거되었다. 가장 높은 likelihood 는 60 이다.

```python
>>> posterior.max_prob()
60
```

가장 높은 숫자를 가진 열차를 우연히 봤을 확률이 얼마나 될까? 그럼에도 정답을 맞출 확률을 최대화하려면 60 을 맞혀야 한다.

하지만 이것이 올바른 목표가 아닐 수도 있다. 다른 대안은 사후 분포의 평균을 계산하는 것이다. 가능한 수량 집합 𝑞𝑖 와 그 확률 𝑝𝑖 이 주어지면 분포의 평균은 다음과 같습니다.

$$\mathrm{mean} = \sum_i p_i q_i$$

```python
>>> np.sum(posterior.ps * posterior.qs)
>>> posterior.mean()
333.41989326370776
```

사후 평균은 333 이므로 오차를 최소화하려는 경우 이 값을 추측하는 것이 좋다. 이 추측을 반복하는 경우 사후 평균을 추정치로 사용하면 장기적으로 평균 제곱 오차(MSE, mean squared error)를 최소화할 수 있다.

# Sensitivity to the Prior
이전 섹션에서 사용한 사전은 1에서 1000까지 균일하지만, 균일 분포 또는 특정 상한을 선택하는 것에 대한 정당성을 제시하지 않았다. 사후분포가 선행 분포에 민감한지 궁금할 수 있다. **데이터가 너무 적고 관측값이 하나뿐인 경우라면 그렇다**.

```python
import pandas as pd

df = pd.DataFrame(columns=['Posterior mean'])
df.index.name = 'Upper bound'

for high in [500, 1000, 2000]:
    hypos = np.arange(1, high+1)
    pmf = Pmf(1, hypos)
    update_train(pmf, data=60)
    df.loc[high] = pmf.mean()
    
df
```

상한을 변경하면 사후 평균이 크게 달라지는데 이는 좋지 않다. 사후가 사전에 민감한 경우 두 가지 방법으로 진행할 수 있다.

- 더 많은 데이터를 확보한다.
- 더 많은 배경 정보를 얻고 더 나은 사전을 선택한다.

**데이터가 많을수록 다양한 사전에 기반한 사후 분포가 수렴하는 경향이 있다.** 예를 들어 열차 60 외에도 열차 30과 90이 있다고 가정해 보겠습니다.

다음은 세 개의 열차를 관찰할 때 사후 평균이 사전의 상한에 따라 어떻게 달라지는지 보여준다.

```python
df = pd.DataFrame(columns=['Posterior mean'])
df.index.name = 'Upper bound'

dataset = [30, 60, 90]

for high in [500, 1000, 2000]:
    hypos = np.arange(1, high+1)
    pmf = Pmf(1, hypos)
    for data in dataset:
        update_train(pmf, data)
    df.loc[high] = pmf.mean()
    
df
```

차이는 더 작지만 분명히 세 개의 열차로는 사후에 수렴하기에 충분하지 않다.

# Power Law Prior
더 많은 데이터를 사용할 수 없는 경우 다른 옵션은 더 많은 배경 정보를 수집하여 사전을 개선하는 것이다. 기관차가 1000대인 기차 운영회사와 1대만 있는 회사가 같은 확률이라고 가정하는 것은 합리적이지 않다.

조금만 노력하면 관찰 대상 지역에서 기관차를 운영하는 회사 목록을 찾을 수 있을 것이다. 또는 철도 운송 전문가를 인터뷰하여 회사의 일반적인 규모에 대한 정보를 수집할 수도 있다.

하지만 철도 경제학에 대해 자세히 알아보지 않더라도 몇 가지 추측을 할 수 있다. 대부분의 분야에는 소기업이 많고 중기업은 적으며 대기업은 한두 개에 불과하다.

실제로 로버트 액스텔이 사이언스(http://www.sciencemag.org/content/293/5536/1818.full.pdf)에서 보고한 것처럼 기업 규모의 분포는 힘의 법칙을 따르는 경향이 있다.

이 법칙에 따르면 기관차가 10개 미만인 회사가 1000개라면 기관차가 100개인 회사는 100개, 1000개인 회사는 10개, 1만 개의 기관차를 보유한 회사는 1개가 있을 수 있습니다.

수학적으로 거듭제곱 법칙은 주어진 규모인 𝑁를 가진 회사의 수가 $(1/N)^{\alpha}$에 비례한다는 것을 의미하며, 여기서 𝛼 는 종종 1에 가까운 변수이다.

이와 같은 식으로 앞서 power law prior 를 구성할 수 있다.

```python
alpha = 1.0
ps = hypos**(-alpha)
power = Pmf(ps, hypos, name='power law')
power.normalize()
```

비교를 위해 사전분포(uniform)은 다음과 같다.

```python
hypos = np.arange(1, 1001)
uniform = Pmf(1, hypos, name='uniform')
uniform.normalize()
```

![](https://i.imgur.com/SCiM2uU.png)
![](https://i.imgur.com/U6ZeSWc.png)

power law 는 높은 값에 대한 사전 확률을 낮추기 때문에 사후 평균이 낮아지고 상한에 대한 민감도가 낮아진다.  

다음은 사전에 거듭제곱 법칙을 사용하고 세 개의 열차를 관찰할 때 사후 평균이 상한에 따라 어떻게 달라지는지 살펴보자.

```python
df = pd.DataFrame(columns=['Posterior mean'])
df.index.name = 'Upper bound'

alpha = 1.0
dataset = [30, 60, 90]

for high in [500, 1000, 2000]:
    hypos = np.arange(1, high+1)
    ps = hypos**(-alpha)
    power = Pmf(ps, hypos)
    for data in dataset:
        update_train(power, data)
    df.loc[high] = power.mean()
    
df
```

이제 그 차이가 훨씬 작아졌다. 실제로 상한을 임의로 크게 설정하면 평균은 134에 수렴한다.

따라서 이전의 power law 는 기업 규모에 대한 일반적인 정보를 기반으로 하고 실제로 더 잘 작동하기 때문에 더 현실적이다.