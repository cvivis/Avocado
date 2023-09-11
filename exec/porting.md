
# 1. 세팅 환경

- Java 11
- Docker 24.0.5
- Node Js 18.0.5
- mysql 8.0.5

# 2. 포트 설정

- openvidu :4443
- react :3000
- springboot :8080

# 3. 필요 외부서비스 데이터 
- 하단의 데이터 필요 
## openvidu

- 비밀번호는 자유
- (1) 명령어 및 properties 설정 참조
- openvidu URL : {연결}
- openvidu secret : (1)에서 설정한 비밀번호

## SSL 인증

- 도메인 주소로 SSL 발급
- keystore.p12 파일을 백엔드 프로젝트 디렉토리에 및 openvidu의 cert 디렉토리에 저장

## S3

- access 토큰
- secret 토큰

## MySQL
- 프로젝트 디비 이름
- mysql 비밀번호
- 유저 이름
- 유저 비밀번호

# 4. 세부 세팅설정 및 설치

## 로컬 세팅
- openvidu
    - 로컬 환경 실행시 docker-compose.yml, openvidu,redis부분 주석해제이후 실행
- redis 
- mysql (3) 하단 참조
    - mysql 세팅용 docker-backend.env파일, backend경로에 생성해야함.  - (3) 하단 참조

### 로컬 설치 코드 수정 사항
- application.yml -> active : db로 수정
- 다운로드 이후 프로젝트 루트에 존재하는 docker-compose 파일 실행
- 개발 당시 nginx 프록시 서버를 사용중이었기에 단순 클라이언트 서버의 연결로 확인할거면 `frontEnd경로에 존재하는 setProxy 파일의 주석 해제`
- nginx 프록시 서버 사용하지 않을 경우 frontend axios 경로에 `/api 지우기`
- 모든 요청은 https → http로 수정 필요
- 모든 요청의 주소 [i9a407.p.ssafy.io](http://i9a407.p.ssafy.io) → localhost로 수정


## 원격 서버 세팅 

### properties 파일
- /backend/src/main/resources/properties/env.properties 파일 생성

```bash
properties.datasource.username = 디비 유저 이름
properties.datasource.password = 디비 비밀번호

properties.openvidu.url = https://i9a407.p.ssafy.io:8443/
properties.openvidu.secret = 하단 (1)의 비밀번호 

properties.jwt.secret = jwt시크릿 키

properties.ssl.key = classpath:keystore.p12 (ssl 인증서)
properties.ssl.type = ssl 타입
properties.ssl.password = ssl 비밀번호

properties.s3.access = s3 access 토큰
properties.s3.secret = s3 secret 토큰
```

- openvidu - docker image pull (1)참조,
     - docker-compose.yml -> openvidu 해당 부분 주석
     - 주석처리된 redis , mysql은 세팅이 안되어있다면 주석해제 이후 처음에만 실행.
- ssl 인증서 필요 -> /backend/src/main/resources/properties에 keystore.p12파일 저장
- redis - (2) 하단 참조
- mysql  - (2)(3) 하단 참조
    - mysql 세팅용 docker-backend.env파일, /backend경로에 생성해야함.  - (3) 하단 참조




### (1) openvidu 이미지 받아오기(외부 서버사용시)

- 비밀번호는 자유

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET={비밀번호| openvidu/openvidu-dev:2.28.04
```

### (2) docker-compose (root directory에 존재)

```bash
version: '3'
services:
  # db:
  #   image: mysql:8
  #   container_name: avocado_db
  #   restart: always
  #   ports:
  #     - "3306:3306"
  #   env_file: ./backend/docker-backend.env
  #   volumes:
  #     - mysql_data:/var/lib/mysqla

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules

  # redis:
  #   image: redis:latest
  #   ports:
  #     - "8379:6379"

  # 로컬 테스트 때 주석 해제 
  #   openvidu:
  #     image: openvidu/openvidu-dev:2.28.0
  #     container_name: avocado_openvidu
  #     ports:
  #       - "4443:4443"
  #     environment:
  #       - OPENVIDU_SECRET=ssafy

volumes:
  mysql_data:
```

### (3)docker-backend.env

```bash
MYSQL_DATABASE=디비 이름
MYSQL_PASSWORD=mysql 비밀번호
MYSQL_USER=mysql 유저 이름
MYSQL_ROOT_PASSWORD=루트 비밀번호
```


### 원격 front 이미지 올리기

```bash
docker compose down
docker compose build
docker compose up -d;
```
### 로컬 FrontEnd 수동 빌드 배포 
- 사용라이브러리 버전문제로 인한 --force 사용

```bash
-> frontend 파일 이동 후
npm i --force
npm start
```
### 로컬 , 원격 공통 BackEnd 빌드 배포

```bash
-> backend 파일 이동 후 
./gradlew clean build
sudo java -jar build/libs/avocado-0.0.1-SNAPSHOT
```

### (참조)nginx.conf 개발 당시

```bash
events {
    worker_connections 1024;   # 연결 수
}

http {

    upstream app-server-3000 {
        server localhost:3000;
    }

    upstream back-server-8080 {
        server localhost:8080;
    }
    upstream websocket-server {
        server i9a407.p.ssafy.io:8080;
    }

    upstream app-server-8443 {
        server localhost:8443;
    }

    upstream jenkins-server-9090 {
        server localhost:9090;
    }

    # React 웹 페이지 서버 설정
server {

        listen 80 default_server;
        listen [::]:80 default_server;
        listen 443 ssl;
        listen [::]:443 ssl;

        server_name i9a407.p.ssafy.io;

        ssl_certificate /etc/letsencrypt/live/i9a407.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/i9a407.p.ssafy.io/privkey.pem;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        location / {
            proxy_pass http://app-server-3000;
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
        }
        location /api {
         rewrite ^/api(.*)$ $1 break;
           proxy_pass  https://back-server-8080;
          # proxy_set_header Host $host:$server_port;
        }
        location /ws/ {
                proxy_http_version 1.1;
                proxy_pass http://websocket-server;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
    }

    server {
        listen 9091;
        location / {
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_pass http://jenkins-server-9090$request_uri;
            proxy_read_timeout  94;
        }
   }

}
```



# 5. Mysql dump 파일

- 테스트 데이터 및 이벤트 핸들러 설정 및 등록하는 sql 데이터 
- admin계정 아이디 admin , 비밀번호 admin
- test계정 아이디 test, 비밀번호 test
- 1 계정 아이디 1, 비밀번호 1

[avocado-dump.sql](exec/avocado-dump.sql)

# 6. 시연 시나리오 
## - 회원가입
![회원가입](docs/register.png)
## - 로그인
![로그인](docs/login.png)
## - 상품 요청 게시판 
![상품요청게시판](docs/consign.png)
## - 상시 경매 게시판
![sangsi](/uploads/1c370aee6b4584469691debab359a82f/sangsi.PNG)
## - 상시 경매 상세 페이지 & 입찰
![hammer](/uploads/a77bab8d68f187d29202b42d6cc42582/hammer.PNG)
## - 라이브 경매 편성
![라이브 편성](docs/liveList.png)
## - 라이브 경매 디테일
![라이브 편성 디테일](docs/liveDetail.png)
## - 라이브 경매 사용자 시점
![라이브 경매 입찰](docs/liveAuctionUser.png)
## - 라이브 경매 어드민 시점 
![라이브 경매 어드민](docs/liveAuctionAdmin.png)
## - 마이페이지
![마이페이지](docs/mypage.png)
## - 어드민 상시 관리
![관리자상시페이지](docs/adminNormal.png)
## - 어드민 상시 관리
![관리자라이브페이지](docs/adminLive.png)

