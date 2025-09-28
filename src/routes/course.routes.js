const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// 강의 목록 조회
router.get('/', courseController.getCourses);

// 강의 상세 조회
router.get('/:lectureId', courseController.getCourseById);

// 강의 생성 (교수 전용)
router.post('/', courseController.createCourse);

module.exports = router;
