---
{"dg-publish":true,"permalink":"/etc/Python/CPython-파헤치기/"}
---


> [!info] CPython 파헤치기 책에서 나온 다이어그램을 직접 그려가며 머릿속으로 정리해본다. (~~뇌에 저장안되니까 노트에라도 저장해두자~~)

```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```

---

### Diagrams


```mermaid
flowchart TD
    file_input(파일 입력)
    io_input(I/O 스트림 입력)
    char_input(문자열 입력)
    reader(리더)
    parser(파서)
    subgraph " "
        compiler(컴파일러)
        assembler(어셈블러)
    end

    run(실행)
    lexer(렉서)
    

    file_input --- reader
    io_input --- reader
    char_input --- reader
    reader --> |텍스트| lexer --> |"CST\n(concrete syntax tree)"| parser --> |"AST\n(abstract syntax tree)"| compiler
    compiler --> |CFG| assembler --> |바이트코드| run
```

- AST: 파이썬 문법과 문장들에 대한 **문맥 있는 트리 표현**
- CST: 토큰과 심벌에 대한 **문맥 없는 트리 표현**


#### 루프에서 파서와 토크나이저를 호출하는 과정


```mermaid
flowchart TD
    text(텍스트)
    init_tokenizer(토크나이저 상태 초기화\ninitialize tok_state)
    
    subgraph tokenizer
        tok_get(다음 토큰 얻기)
    end
    
    subgraph parser
        parse_token(토큰 파싱)
        cst_node(CST에 노드 추가)
    end

    text --> init_tokenizer --> tok_get --> |아이디| parse_token --> |노드| cst_node --> cst
    cst_node --> |loop| tok_get
```


#### PyFrameObject


```mermaid
flowchart TB
    subgraph "프레임 객체"
        n1[[내장 이름 공간]]
        n2[[전역 이름 공간]]
        n3[[지역 이름 공간]]
        n4[[값 스택]]
        subgraph "코드 객체"
            n11[[명령]]
            n22[[이름]]
            n33[[상수]]
        end
    end
```


### 헷갈리는 단어 혹은 알아두면 좋을 내용


- 마샬링: 파일 내용을 메모리로 복사하여 특정 데이터 구조로 변환하는 것을 의미
    - more..
        - https://docs.python.org/ko/3/library/marshal.html
        - https://www.geeksforgeeks.org/marshal-internal-python-object-serialization/
- 평가루트 (execution loop)
    - execution loop 늠 코드 객체를 입력받아 frame 객체를 반환한다.
    - 인터프리터는 최소 한 개 스레드를 갖는다.
    - 각 스레드는 스레드 상태를 갖는다.
    - frame 객체는 프레임 스텍(stack frame)에서 실행된다.
        - https://google.github.io/pytype/developers/frames.html#overview
        - https://realpython.com/cpython-source-code-guide/#execution
    - 값 스택에서 변수를 참조할 수 있다.


### memory


- cpython 은 C의 동적 메모리 할당에 크게 의존한다. 가비지 컬렉션과 레퍼런스 카운팅 알고리즘을 이용한 안전장치가 존재한닼
- 

### reference
- [Defining Main Functions in Python](https://realpython.com/python-main-function/)
