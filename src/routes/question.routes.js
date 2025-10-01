const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

// 특정 강의에 질문 등록
router.post('/:lectureId/questions', questionController.createQuestion);

// 특정 강의 질문 목록 조회
router.get('/:lectureId/questions', questionController.getQuestionsByLecture);

// 특정 질문 상세 조회
router.get('/questions/:questionId', questionController.getQuestionById);

// 질문 Upvote
router.post('/questions/:questionId/upvote', questionController.upvoteQuestion);

// 강의자 답변 등록
router.post('/questions/:questionId/answer/instructor', questionController.answerByInstructor);

// AI 답변 등록
router.post('/questions/:questionId/answer/ai', questionController.answerByAI);

module.exports = router;
