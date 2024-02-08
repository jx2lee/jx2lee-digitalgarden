---
{"dg-publish":true,"permalink":"/etc//why-i-prefer-regular-merge-commits-over-squash-commits/"}
---


개인 github 및 회사 작업을 진행하면서 merge 시 왜 merge commit 을 남기는가에 대한 의문이 있었다. 단지 branch tree 를 봤을 때 이뻐서? 라는 생각을 했는데 아래 링크를 보며 생각을 다시하게 되었다. 간단히 정리하면 다음과 같다.

```
저도 깔끔한 커밋 히스토리가 있으면 좋겠지만, 일상적인 업무에 지장을 줄 수 있다는 단점이 있습니다. "다른 버그를 수정할 때 이 버그를 고쳤어요"라고 알면 좋지만, 스쿼시 커밋은 충분한 정보를 제공하지 못합니다.

상사가 18개월 전에 특정 코드 줄을 변경한 것을 git 블레임으로 검사하여 알았다고 가정해 봅시다. 이 시점에서 상사는 저를 위해 조사할 시간을 찾을 수 있다고 해도 왜 변경했는지 전혀 모를 것입니다.

스쿼시 커밋을 사용하면 더 적은 정보만 남게 됩니다: 저는 해당 줄이 변경된 버그 수정이나 기능만 알 수 있고, 실제 변경된 이유는 알 수 없으며, 그것만으로는 계속 진행하기에 충분하지 않습니다.

모든 줄에 한두 개의 코드 주석이 있으면 좋겠지만, 대부분의 개발자가 그렇게 작업하지 않는다는 것을 우리 모두는 알고 있습니다. 저는 일반적으로 새로운 React 코드베이스를 볼 때 실제로 주석이 있는 코드를 1% 미만으로 봅니다.

코드가 왜 변경되었는지 전혀 모르는 이유는 매우 간단합니다. 상사가 당시 커밋 메시지에 그 이유를 적어두었지만, 아무 이유 없이 "스쿼시"하기로 결정했기 때문입니다. 그런 일은 기쁨을 불러일으키지 못합니다.
```

즉, squash 를 사용하면 merge commit 보다 더 적은 내용이 들어가기 때문이라고 한다. 트래킹 혹은 히스토리 파악을 위해 적은 정보를 포함하는 커밋은 지양하는게 좋다. 

최근 몇달 간 datahub 도큐먼트 내용 수정을 위해 컨트리뷰트 한 경험이 있다. 이 오픈소스는 master 브랜치를 기반으로 수정한 브랜치에 수정 -> upstream repo 에 PR 을 생성하고 받아들여지면 merge 한다. 이때 datahub 팀은 생성한 PR 정보를 남기며 squash 로 커밋 내용들을 정리했다. (작업에 참여한 사용자를 표시한다. e.g `Co-authored-by: John Joyce <john@acryl.io>`)

datahub 와 같은 오픈소스를 제외하고 사내 서비스에서는 위와 같이 squash 보다는 merge commit 을 생성하는 게 좋다. 즉, 진행하는 프로젝트의 성격에 맞게 convention 을 적절하게 정하는 것이 중요하다.

# reference
[Why I Prefer Regular Merge Commits Over Squash Commits](https://betterprogramming.pub/why-i-prefer-regular-merge-commits-over-squash-commits-cadd22cff02c
)