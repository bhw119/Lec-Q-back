const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

// 강의 리포트 조회
router.get('/lecture/:lectureId', reportController.getLectureReport);

// 개인 리포트 조회
router.get('/user/:userId', reportController.getUserReport);

// 리포트 생성
router.post('/:userId', reportController.createReport);

// 사용자 리포트 업데이트
router.put('/user/:userId', reportController.updateUserReport);

module.exports = router;

