# Lec-Q-back

대규모 비대면 강의 환경에서 발생하는 교육적 격차를 해소하기 위한 AI 기반 실시간 학습 보조 플랫폼 Lec-Q BackEnd

## How to Use(Server)

```bash

# 1. 패키지 설치
npm  install

# 2. 서버 실행
cd lec-q_server
node app.js

# 또는 nodemon 사용 시
npx  nodemon  app.js
```

## How to Use(api 명세서)

```bash

# 1. 패키지 설치
npm  install

# 2. 서버 실행
node mock_server.js

# 또는 nodemon 사용 시
npx  nodemon  mock_server.js
```

## 🗄️ DB 구조 (MongoDB + Mongoose) - 추후 업데이트

### 📌 User (사용자)

| 필드명    | 타입                          | 설명          |
| --------- | ----------------------------- | ------------- |
| email     | String (unique)               | 사용자 이메일 |
| password  | String                        | 비밀번호      |
| name      | String                        | 이름          |
| role      | Enum(`student`, `instructor`) | 사용자 역할   |
| createdAt | Date (default: now)           | 생성일        |
| PhoneNum  | String                        | 전화번호        |
| Birth     | String                        | 생년월일        |

---

### 📌 Course (강의)

| 필드명       | 타입                                | 설명                           |
| ------------ | ----------------------------------- | ------------------------------ |
| title        | String                              | 강의 제목                      |
| description  | String                              | 강의 설명                      |
| instructor   | ObjectId (ref: User)                | 강사                           |
| schedule     | Object `{ start: Date, end: Date }` | 강의 일정                      |
| participants | [ObjectId] (ref: User)              | 수강생                         |
| materials    | [String]                            | 강의 자료 (PDF 경로 or GridFS) |
| createdAt    | Date                                | 생성일                         |

---

### 📌 Question (질문)

| 필드명           | 타입                    | 설명          |
| ---------------- | ----------------------- | ------------- |
| course           | ObjectId (ref: Course)  | 속한 강의     |
| author           | ObjectId (ref: User)    | 질문 작성자   |
| content          | String                  | 질문 내용     |
| page             | Number                  | 교안 페이지   |
| isAnonymous      | Boolean (default: true) | 익명 여부     |
| upvotes          | [ObjectId] (ref: User)  | 추천한 사용자 |
| aiAnswer         | String                  | AI 답변       |
| instructorAnswer | String                  | 강사 답변     |
| createdAt        | Date                    | 생성일        |

---

### 📌 Report (리포트)

| 필드명       | 타입                                                  | 설명      |
| ------------ | ----------------------------------------------------- | --------- |
| course       | ObjectId (ref: Course)                                | 강의      |
| topQuestions | [ObjectId] (ref: Question)                            | 주요 질문 |
| stats        | Object `{ questionCount, activeStudents, wordCloud }` | 통계      |
| createdAt    | Date                                                  | 생성일    |
