# Assignment 2
원티드x위코드 백엔드 프리온보딩 과제2
- 과제 출제 기업 정보
  - 기업명 : 프레시코드
  - [프레시코드 사이트](https://www.freshcode.me/)
  - [wanted 채용공고 링크](https://www.wanted.co.kr/wd/34118)

## Members
|이름   |github                   |담당 기능|
|-------|-------------------------|--------------------|
|김남형 |[x](https://github.com/)   | Unit Testing   |
|김서경 |[x](https://github.com/) | Deployment   |
|김요셉 |[kim-jos](https://github.com/kim-jos)     | 회원가입, 로그인, user CRUD   |
|정천우 |[codehousepig](https://github.com/codehousepig)   | Menu, Item, Tag CRUD, DB Modeling   |
|최유진 |[x](https://github.com/) | DB Modeling, postman api 작성   |


## 과제 내용
> 아래 요구사항에 맞춰 게시판 Restful API를 개발합니다.
- 주어진 요구사항에 대한 설계/구현 능력
- 코드로 동료를 배려할 수 있는 구성 능력 (코드, 주석, README 등)
- 유닛 테스트 구현 능력

### [필수 포함 사항]
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현
    - Swagger 대신 Postman 이용시 API 목록을 Export하여 함께 제출해 주세요
- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - 완료된 시스템이 배포된 서버의 주소
    - Swagger를 통한 API 테스트할때 필요한 상세 방법
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅

### [개발 요구사항]
- 로그인 기능
  - JWT 인증 방식을 구현합니다.
- Database 는 RDBMS를 이용합니다.


## 사용 기술 및 tools
> - Back-End :  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
> - Deploy : <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>
> - ETC :  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>

## 모델링
![freshcode](https://user-images.githubusercontent.com/77760709/140546589-326dc80f-b368-4297-ac03-50ccf23dab14.png)

## API
[링크-postman document]()


## 구현 기능
### 회원가입, 로그인
- 회원가입시 password 같은 민감정보는 해쉬 알고리즘인 bcrypt를 사용해 암호화 하여 database에 저장했습니다
- 로그인이 성공적으로 완료되면 JWT 토큰이 반환됩니다

### 상품 CRUD
- 조회는 누구나 가능하며, 로그인 이후 권한을 검사하여 관리자("role":"admin")는 상품 추가/수정/삭제를 할 수 있습니다.
- 기본 상품 조회 수는 5개이며, limit=상품개수 로 한 페이지당 조회되는 개수를 조절할 수 있습니다.

### 아이템, 태그 CRUD
- Item, Tag 각각 조회는 가능하지만, 추가/수정/삭제는 관리자만이 할 수 있습니다.
- Menu 와 관계를 맺고 있어 따로 조회를 하지 않아도 해당 메뉴와 같이 조회됩니다.
- 연관된 Menu 삭제 시 같이 삭제됩니다.

## API TEST 방법
1. 

## 설치 및 실행 방법


## TIL정리 (Blog)
- 김남형 :
- 김서경 :
- 김요셉 :
- 정천우 : [codehousepig](https://blog.naver.com/codehouse9/222559886750)
- 최유진 :

# Reference
이 프로젝트는 원티드x위코드 백엔드 프리온보딩 과제 일환으로 FRESHCODE에서 출제한 과제를 기반으로 만들었습니다.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
