const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');

// Express 앱 초기화
const app = express();
app.use(express.json());

// Swagger 문서 불러오기
const swaggerPath = path.join(__dirname, 'src', 'docs', 'openapi.yaml');
const swaggerDocument = yaml.load(swaggerPath);

// Swagger UI 세팅
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 라우트 연결
app.use('/api/v1/auth', require('./src/routes/auth.routes'));        // 회원가입, 로그인
app.use('/api/v1/lectures', require('./src/routes/course.routes'));  // 강의 목록, 상세, 생성
app.use('/api/v1/lectures', require('./src/routes/question.routes'));// 특정 강의 질문 등록/조회
app.use('/api/v1/questions', require('./src/routes/question.routes'));// 질문 상세 조회
app.use('/api/v1/reports', require('./src/routes/report.routes'));   // 리포트 조회/생성/업데이트

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running at http://localhost:${PORT}`);
  console.log(`📖 Swagger UI available at http://localhost:${PORT}/api-docs`);
});







