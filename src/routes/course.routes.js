const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// 강의 목록 조회
router.get('/', courseController.getCourses);

// 강의 상세 조회
router.get('/:lectureId', courseController.getCourseById);

// 강의 생성 (교수 전용)
router.post('/', courseController.createCourse);

// 교안 업로드 (스켈레톤)
router.post('/:lectureId/upload', courseController.uploadRealMaterial);

// 실시간 필기 데이터 전송 (스켈레톤)
router.post('/:lectureId/realtime-notes', courseController.sendRealtimeNote);

module.exports = router;
