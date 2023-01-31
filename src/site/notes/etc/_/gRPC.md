---
{"dg-publish":true,"permalink":"/etc/_/gRPC/","dgPassFrontmatter":true}
---

#grpc

```toc
```

---

# [protocol buffer](https://protobuf.dev)

정보를 저장하는 규칙인 IDL(*Interface Definition Language*)로 XML, JSON 그리고 **protocol buffer** 가 존재한다. protocol buffer(*이하 protobuf*) 는 직렬화한 데이터 구조(*Serializaaed Data Structure*) 로 구글에서 개발하고 오픈소스로 공개하였다. XML 과 같이 `.proto` 파일에 메세지 타입을 정의해 사용한다. documentation 에서는 XML 과 비교하여 더 작고 더 빠르고 더 간단하다고 설명하고 있다.

자세한 내용은 [protocol bugffer documentation](https://protobuf.dev) 에서 확인할 수 있다.

# RPC (Remote Procedure Call)
![](https://i.imgur.com/xKcL2IC.png)

위키피디아에서는 별도의 원격 제어를 위한 코드 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게하는 프로세스간 통신 기술 이라고 설명한다. 또한, 근래 핫한 chatgpt 에 물어보니 다음과 같이 답변하였다.

> RPC(원격 프로시저 호출)는 한 컴퓨터에서 실행 중인 컴퓨터 프로그램이 마치 로컬 프로시저인 것처럼 다른 컴퓨터의 서브루틴 또는 프로시저를 호출할 수 있도록 하는 통신 프로토콜입니다. 두 컴퓨터는 네트워크를 통해 통신하고 호출 프로그램은 결과를 반환하는 호출된 프로시저에 매개 변수를 전달합니다.
> 
> RPC는 서로 다른 컴퓨터 간의 프로세스 간 통신을 가능하게 하고 분산 응용 프로그램의 개발을 단순화하는 데 사용됩니다. RPC를 사용하면 RPC 시스템에서 컴퓨터 간의 통신 세부 정보를 처리하므로 개발자가 여러 컴퓨터에서 작동하는 코드를 더 쉽게 작성할 수 있습니다.
> 
> 실제로 RPC를 사용하려면 호출자와 호출 수신자 간의 "계약"을 정의해야 합니다. 이 계약은 호출자가 호출 수신자에게 전달할 매개변수와 호출 수신자가 반환할 결과를 지정합니다. 이 계약은 일반적으로 RPC 시스템에서 사용할 수 있는 데이터 유형과 기능을 정의하는 인터페이스 정의 언어(IDL)를 사용하여 표현됩니다. 그런 다음 IDL은 필요한 통신을 구현하는 호출자와 호출 수신자 모두에 대한 코드를 생성하는 데 사용됩니다.
> 
> 전반적으로 RPC는 여러 컴퓨터에서 작동하는 코드를 더 쉽게 작성할 수 있으므로 분산 시스템을 구축하기 위한 강력한 도구입니다. 또한 개발자가 통신의 세부 사항에 대해 걱정하는 대신 원하는 기능을 구현하는 코드를 작성하는 데 집중할 수 있도록 컴퓨터 간의 통신 세부 사항을 캡슐화하는 데 도움이 됩니다.

구글링을 통해 국내 블로그를 살펴보았는데 [protobuf 가 RPC 의 구현체](https://nesoy.github.io/articles/2019-07/RPC)라고 설명하거나, [RPC 기술 중 하나](https://kimkoungho.github.io/network/rpc/)라고 설명하고 있다. 내가 이해한바로는 `구현체` 라는 단어 해석에 차이가 있을 수 있지만 RPC 의 구현체보다 **gRPC 구현에 이용한 IDL 이 protobuf** 라고 생각한다. 그리고 RPC 기술이라는 표현보다는 **gRPC 를 구성하는 기술 중 하나**라고 보는게 적절하다 생각한다. (*~~사실 큰 차이는 없지만..~~*)

**결론:** RPC 는 **분산 네트워크 환경에서 조금 더 편하게 프로그래밍 하기 위한 기술**이다. 클라이언트 - 서버 간의 커뮤니케이션에 필요한 **상세한 정보는 최대한 감추고 로직에만 집중할 수 있도록** 클라이언트/서버는 일반 메소드를 호출하는 것처럼 개발환경을 제공한다. 비교하자면 [REST 와 비교](https://nordicapis.com/whats-the-difference-between-rpc-and-rest/)할 수 있다.

# gRPC
![https://grpc.io/img/landing-2.svg](https://i.imgur.com/axS04Bx.png)


# QuickStart
## Python
## Java

# reference
- [Introduction to gRPC](https://grpc.io/docs/what-is-grpc/introduction/)
- [Protocol Buffers Documentation](https://protobuf.dev)
- [What’s the Difference Between RPC and REST?](https://nordicapis.com/whats-the-difference-between-rpc-and-rest/)
- kr
	- [gRPC 1 - gRPC란?](https://chacha95.github.io/2020-06-15-gRPC1/)
	- [gRPC 훑어보기](https://meetup.nhncloud.com/posts/261)