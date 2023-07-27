# 🥑 아보카도 마켓 
<h4 align="center">아보카도 라이브 경매 프로젝트</h4>
<p align="center"><img src="docs/LOGO.png" height="200px" width="500px"></p>
<h5 align="center">개발기간: 2023.07.10 ~ 2022.08.18</h5>
<p>팀 명 : A4용지</p>
<p>프로젝트 명 : AVOCADO</p>
<p>팀원 : 황시은, 정연수, 오승기, 이원희, 정재현, 권민재</p>
<p>배포 링크 : ---------------</p>

<p><span style="background-color:#dcffe4">아</span>무거나</p> 

<p>보여주고</P> 

<p>카메라로 판매하는</p> 

<p>도떼기경매</p> 

# ❤ 서비스 소개
<p>`경매` 거래방식을 메인으로 잡은 서비스로, 이용자의 물건을 등록하고 `라이브경매`와 `상시경매`를 통해 이용자는 다양한 상품을 적절한 가격으로 구매할 수 있습니다.</p>

# 🧡 팀원 소개

| 황시은 | 정연수 |  오승기   | 이원희   | 정재현   | 권민재   |
| :--------: | :--------: | :------: | :-----: |     :-----:|:-----:|
|    <p>확실히 이해하면서</p> <p>진행하자!</p>      |   <p>모르는 건 익히고,</p> <p>할 수 있는 건 최선!</p>     | <p>마인드도 실력도</p> <p>성장!</p> | <p>항상 긍정적으로</p> <p>최선을 다하자!</p> | 미리 하기! |“그냥” 이라 하지 않기 | 

<br>

# 💛 기술 스택

![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1690185619609?alt=media&token=ee8eb7b5-3ea7-4fb9-ba7b-cbd818ceddd0)

<br>

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
    <img src="https://img.shields.io/badge/HTML5-white?style=for-the-badge&logo=html5&logoColor=red" alt="">
    <img src="https://img.shields.io/badge/CSS3-white?style=for-the-badge&logo=css3&logoColor=blue" alt="">
    <img src="https://img.shields.io/badge/JS-white?style=for-the-badge&logo=javascript&logoColor=yellow" alt="">
    <img src="https://img.shields.io/badge/React-white?style=for-the-badge&logo=react&logoColor=green" alt="">
</div>

### Authorization

<div>
    <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" alt="">
    <img src="https://img.shields.io/badge/jwt-black?style=for-the-badge&logo=&logoColor=white" alt="">
</div>

### CI/CD

<div>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" alt="">
</div>

### Infra

<div>
  <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/Nginx-white?style=for-the-badge&logo=nginx&logoColor=green" alt="">
</div>

### Tool

<div>
  <img src="https://img.shields.io/badge/intellij-blue?style=for-the-badge&logo=&logoColor=" alt="">
  <img src="https://img.shields.io/badge/Gradle-white?style=for-the-badge&logo=Gradle&logoColor=navy" alt="">
</div>

### Collaboration

<div>
  <img src="https://img.shields.io/badge/Notion-FFFFFF?style=for-the-badge&logo=Notion&logoColor=black" alt="">
  <img src="https://img.shields.io/badge/Matter Most-white?style=for-the-badge&logo=mattermost&logoColor=navy" alt="">
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

다음 사이트 내용 기반으로 토의

[Karma - Git Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

[우린 Git-flow를 사용하고 있어요 | 우아한형제들 기술블로그](https://techblog.woowahan.com/2553/)

### MASTER

- 메인 브랜치. develop에서 일정 작업이 끝나면 pr

### DEVELOP

- 각 피쳐들이 병합되는 중심지
- 백엔드: develop-backend
- 프론트: develop-frontend
- develop → master 병합 결정은 팀장 재량

### FEATURE

- 기능 하나당 하나의 브랜치에 작업
- 즉, `한 사람당 한 브랜치`를 사용
- 상황에 따라 `중간 브랜치`를 두고 그곳에 병합할 수 있음
- **브랜치 네이밍**은 `케밥 케이스` 사용 
ex) 방송의 채팅 피쳐를 맡은 경우 feature-live-chatting
    - develop의 경우 백, 프론트 구분을 위해 backend/develop, frontend/develop 식으로 구현
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

- mvp 다 하고 열심히 파봅시당

# 💜 프로젝트 중점사항

- 문서화
- 단위테스트를 통한 service 의존성 분리

# 🤎 경매 과정 구조도

(대충 사진)

# 🖤 DB ERD

(대충 erd)

# 🤍 Front

(대충 피그마 사진)


