# 🥑 아보카도 마켓 - cicd

<h4 align="center">아보카도 라이브 경매 프로젝트</h4>
<p align="center"><img src="docs/LOGO.png" height="200px" width="500px"></p>
<h5 align="center">개발기간: 2023.07.10 ~ 2022.08.18</h5>
<p>팀 명 : A4용지</p>
<p>프로젝트 명 : AVOCADO</p>
<p>팀원 : 황시은, 정연수, 오승기, 이원희, 정재현, 권민재</p>
<p>배포 링크 : [아보카도 경매]()</p>

<p><strong>아</strong>무거나</p>

<p><strong>보</strong>여주고</P>

<p><strong>카</strong>메라로 판매하는</p>

<p><strong>도</strong>떼기경매</p>

# ❤ 서비스 소개

<p>`경매` 거래방식을 메인으로 잡은 서비스로, 이용자의 물건을 등록하고 `라이브경매`와 `상시경매`를 통해 이용자는 다양한 상품을 적절한 가격으로 구매할 수 있습니다.</p>

# 🧡 팀원 소개

|                  황시은                   |                       정연수                        |               오승기                |                    이원희                    |   정재현   |        권민재         |
| :---------------------------------------: | :-------------------------------------------------: | :---------------------------------: | :------------------------------------------: | :--------: | :-------------------: |
| <p>확실히 이해하면서</p> <p>진행하자!</p> | <p>모르는 건 익히고,</p> <p>할 수 있는 건 최선!</p> | <p>마인드도 실력도</p> <p>성장!</p> | <p>항상 긍정적으로</p> <p>최선을 다하자!</p> | 미리 하기! | “그냥” 이라 하지 않기 |

<br>

# 💛 기술 스택

### Backend

<div> 
  <img src="https://img.shields.io/badge/java 11-007396?style=for-the-badge&logo=java&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/springboot 2.7.13-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Spring Data Jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="">
</div>

### Database

<div>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/redis-%23DC382D?style=for-the-badge&logo=redis&logoColor=white&color=red" alt="">
</div>

### Frontend

<div>
  <img src="https://img.shields.io/badge/React-0088CC?style=for-the-badge&logo=react&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white&color=white alt="">
</div>

### CI/CD & infra

<div>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/%20Nginx-009639?style=for-the-badge&logo=react&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="">
</div>

# 💚 코드 컨벤션 & Git flow

## 1. 코드 컨벤션

### 메소드명

- 예외를 반환하는 경우 끝에 OrElseThrow 붙임
  ex) 사용자 명을 찾는데 없으면 예외를 반환하는 경우 findMemberOrElseThrow 라고 붙임
- cancle같이 예외 반환이 명확한 경우엔 생략해도 괜춘

### 변수명

- final or static 이 붙는 변수명은 `대문자`로 작성, 공백이 필요하면 `_` 사용
- 그 외엔 `Camel Case` 사용

### ENUM

- 모든 항목은 `대문자`로 구성
- 각 원소 식별자는 정수가 아닌 `**문자열**`로 한다.

### 패키지 구성

- domain과 repository는 같은 패키지에 넣자

<br>

## 2. 브랜치 관리

## 1. 브랜치 관리
Git-Flow 브랜치 전략에 따라 기능별로 브랜치를 나누어 작업하고 있고 모든 브랜치에 대해 pull request를 통한 리뷰 완료 후 Merge를 하고 있습니다.
![1](/uploads/210aa8c397441e20d6cd77a97a8449b4/1.png)

✅ master : 제품으로 출시될 수 있는 브랜치

✅ develop : 다음 출시 버전을 개발하는 브랜치. feature에서 리뷰완료한 브랜치를 Merge

✅ feature : 기능을 개발하는 브랜치

✅ hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치

참고 문헌
- [우아한 형제들 기술블로그 "우린 Git-flow를 사용하고 있어요"](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html)
- [README 참고](https://github.com/f-lab-edu/event-recommender-festa)

## 2. 커밋 관리

Karma - Git Commit Msg

- 기능 하나당 하나의 브랜치에 작업
- 즉, `한 사람당 한 브랜치`를 사용
- 상황에 따라 `중간 브랜치`를 두고 그곳에 병합할 수 있음
- **브랜치 네이밍**은 `케밥 케이스` 사용
  ex) 방송의 채팅 피쳐를 맡은 경우 feature-live-chatting - develop의 경우 백, 프론트 구분을 위해 backend/develop, frontend/develop 식으로 구현
- 각 FEATURE들은 중간 브랜치 또는 DEVELOP 브랜치에 `스쿼시 머지` 후 새로운 브랜치 생성

### MERGE

- 머지 conflict 발생시, 병합 지정
  충돌 날 때 중간 브랜치 또는 DEVELOP에다 하면 커밋 로그가 지저분해짐
- `스쿼시 머지` 후 `브랜치 삭제`
- 브랜치 네이밍은 `케밥 케이스` 사용

### HOTFIX

- 급하게 수정할 일이 있을 때 사용
- `스쿼시 머지` 후 `브랜치 삭제`
- 브랜치 네이밍은 `케밥 케이스` 사용
  <br>

## 3. 커밋 관리

EX) 채팅 기능 구현시 **Feat: 채팅 기능 구현**
필요시 1~2줄 정도의 추가 메시지 달 수 있다.

### Feat

- 새로운 기능이 추가될 때

### Docs

- readme, swagger, 주석같이 문서화와 관련된 모든 작업

### Style

- 포맷팅, 코드 컨벤션같이 로직이 바뀌지 않은 수정 작업

### Refact

- 코드 로직 재구성과 관련된 모든 작업

### Chore

- 사소한 커밋
  ex) Chore: 점심 먹기 전 커밋

### Test

- test 코드 작성과 관련된 모든 작업

<br>

# 💙 기술 issue 해결 과정

- 문서화를 통한 협업
- PR 과정에서 발생하는 conflict 해결 및 협업 능력 향상
- Spring Boot를 활용해 주어진 요구에 맞춰 REST API 설계 및 구현
- 주어진 요구에 맞춰 ERD 설계

# 💛 프로젝트 구조

![2](docs/AvocadoArchitecture.png)

# 🤎 유스케이스 다이어그램

<img src="docs/유스케이스_다이어그램.png">

# 🖤 DB ERD

![아보카도_ERD](docs/아보카도_ERD.png)

# 🤍 Front

### 와이어프레임

<img src="docs/와이어프레임_모음.png">

### 목업

<img src="docs/목업_모음.png">
