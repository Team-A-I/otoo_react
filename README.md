# 📖 갈등 판결 서비스 '몇대몇'

![Readme](https://github.com/user-attachments/assets/d0dc47aa-9c6c-4858-a102-6f4dadae7d83)

- 배포 URL : https://www.otoo.kr/
- Test ID : otoo
- Test PW : 1234
- RestAPI REPO URL : https://github.com/Team-A-I/otoo_java
- FastAPI REPO URL : https://github.com/Team-A-I/otoo_python_llm

<br>

## 프로젝트 개요
아오, 답답해 누구한테 물어보지?! 누가 시원하게 대답해줘!
커뮤니티에 글을써서 물어보기는 과한거같고, 몰래 물어보고싶은데.. <br/>
우리 AI기반 웹서비스 몇대몇은 
여러 관계속에 오고가는 대화들을 명확하게 판결 해드립니다.<br/>
누가 맞았어! 대화속 시원한 판결
카카오톡, 챗봇 등 다양한 대화로 알아보는 판결

## 프로젝트 소개
- 음성, 텍스트, 이미지 모든 형태의 대화 데이터 기반으로 상황 판단 후 판결을 내려주는 서비스
- 서운함을 달래줄 언제나 내편, 무조건 맞장구 쳐주는 캐릭터 챗봇과 더불어 나의 감정을 추스려주는 감정리포트

<br>

## 팀원 구성

|<img src="https://avatars.githubusercontent.com/u/109562023?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/143330992?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/150677044?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/159854114?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|Hweeun Kwon<br/>[@heweun](https://github.com/heweun)|[@hyunseok92](https://github.com/hyunseok92)|[@catapracts](https://github.com/catapracts)|baejeonghyun<br/>[@baejeonghyun23](https://github.com/baejeonghyun23)|

<br>

## 1. 개발 환경

- Front :  React
- Back-end : RestAPI , FastAPI
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Slack, Notion, Github
- 서비스 배포 환경 : Netlify , AWS ECS
- 디자인/브래인스토밍 : Figma , Miro
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
    
### FastAPI

- 속도와 성능
    - FastAPI는 Python의 최신 기능을 활용하여 높은 성능을 제공합니다. 특히 비동기 처리를 지원하여 요청을 빠르게 처리할 수 있습니다. 이는 LLM과 OCR 모델과 같은 고성능 연산이 필요한 작업에 적합하여 FastAPI를 사용했습니다.
- 확장성
    - FastAPI는 다양한 플러그인과 라이브러리를 쉽게 통합할 수 있어 확장성과 유지보수성이 뛰어납니다. 이를 통해 프로젝트의 요구사항 변화에 유연하게 대응할 수 있습니다.

### RestAPI

- JPA ORM (Java Persistence API)
    - JPA를 사용하면 객체 지향 프로그래밍 언어로 데이터베이스 작업을 수행할 수 있습니다. 이는 SQL을 직접 작성할 필요 없이 데이터베이스와 상호 작용할 수 있게 해줍니다.
    - 데이터베이스 테이블과 자바 객체 간의 매핑을 자동으로 처리해주는 JPA를 통해 데이터베이스 연동 코드 작성이 간소화되고, 유지보수성이 향상됩니다.
    - JPA는 데이터베이스 특정 기능에 대한 추상화를 제공하여, 다양한 데이터베이스를 쉽게 교체할 수 있는 유연성을 제공합니다.
    - 또한, JPA는 1차 캐시와 2차 캐시를 제공하여 데이터베이스 접근 성능을 최적화할 수 있습니다.
 
- Spring Security
    - Spring Security는 인증과 권한 부여, 공격 방어 (예: CSRF, XSS, 세션 고정)와 같은 다양한 보안 기능을 제공하여 애플리케이션의 보안성을 높일 수 있었습니다.
    - 다양한 인증 방식을 지원하며, 이를 쉽게 구성할 수 있습니다. 예를 들어, OAuth2, JWT, REDIS, REFRESH TOKEN 같은 기본 인증 등을 손쉽게 조합하여 사용할 수 있었습니다.
    - Spring Security는 Spring 생태계와 자연스럽게 통합되며, Spring Boot와 함께 사용하기 매우 용이합니다. 이는 보안 관련 코드를 쉽게 추가하고 관리할 수 있었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature , HotFix 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 main 역할을 하는 브랜치입니다.
    - **Feature** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.
    - **HotFix** 브랜치는 배포 단계에서 긴급하게 수정할 때 사용하는 브랜치입니다.

<br>

## 3. 프로젝트 아키텍처

![image](https://github.com/user-attachments/assets/78283e0f-52cf-4beb-8d81-b41c82d6d4df)



<br>

## 4. 역할 분담
* **김현석**: 챗봇 + RAG + Redis,Security + 한일 더 적어줘요
* **정상엽**: 관리자페이지 + 마이페이지 + 우정추론페이지 + 한일 더 적어줘요
* **배정현**: STT + 판결 결과페이지

### 🍊권회은

- **UI**
    - 페이지 : 홈, 방명록, 업로드모달, 동의모달
    - 공통 컴포넌트 : 전역 글씨폰트, 버튼
- **기능**
    - Paddle OCR, 시스템 프롬프트 작성,  데이터 전처리, 방명록 등록 및 삭제, 중복코드 정리, 서브모듈 ,DB에 데이터 저장

<br>
    
### 👻김현석

- **UI**
    - 페이지 : 장구봇, 로그인/회원가입, 감정리포트, 관리자페이지(임베딩값 DB저장)
    - 공통 컴포넌트 : AXIOS설정
- **기능**
    - 장구 챗봇 , QnA챗봇, 감정리포트, Redis, Sercurity, ERD작성, RAG

<br>

### 😎정상엽

- **UI**
    - 페이지 : 관리자페이지, 마이페이지
- **기능**
    - 데이터 셋 만들기, 파이선 백 디버깅, 마이페이지, 관리자페이지 

<br>

### 🐬배정현

- **UI**
    - 페이지 : 업로드페이지, 음성업로드, 결과페이지
    - 공통 컴포넌트 : 버튼, Tip모달창
- **기능**
    - 배포, CI/CD 구축 , STT, Chat OpenAI, 리팩토링, 비동기처리, google Analytics4 
    
<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-12-19 ~ 2024-7-31
- 기획 및 회의 : 2024-06-19 ~ 2024-06-24
- 기획 발표 : 2024-06-25
- 환경설정 : 2024-06-26 ~ 2024-06-29
- 모델 테스트 및 사용 모델 확정 : 2024-07-01 ~ 2024-07-06
- 프로젝트 개발 : 2024-07-08 ~ 2024-07-20
- 배포 및 피드백 : 2024-07-21 ~ 2024-07-23
- 에러수정 및 피드백 수렴 : 2024-07-24 ~ 2024-07-26
- 문서 작업 및 발표 준비 : 2024-07-29 ~ 2024-07-30
- 최종발표 : 2024-07-31

<br>

### 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 데일리 스크럼을 통해 매일 작업 상황을 공유하였습니다.
- 일주일에 한번씩 회고를 통해 부족한모습과 그대로 가져가야 할 점들을 정리하였습니다.

<br>

## 6. 신경 쓴 부분

- 

<br>

## 7. 페이지별 기능

### [초기화면]

<br>

### [회원가입]

<br>

### [로그인]

<br>

### [갈등판결 업로드]

<br>

### [갈등판결(STT)]

<br>

### [갈등판결(OCR)]

<br>

### [갈등판결 결과페이지]

<br>

### [장구봇(일반모드)]

<br>

### [장구봇(장구모드)]

<br>

### [장구봇(감정리포트)]

<br>

### [마이페이지]

<br>

### [관리자페이지]

<br>

## 8. 트러블 슈팅

-

<br>

## 9. 개선 목표

- 
    
<br>

## 10. 프로젝트 후기

### 🍊 권회은

- 

<br>

### 👻 김현석

- 


<br>

### 😎 정상엽

- 
<br>

### 🐬 배정현

- 
