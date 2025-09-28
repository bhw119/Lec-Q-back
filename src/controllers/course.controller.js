const courseService = require('../services/course.service');

// 강의 목록 조회
exports.getCourses = (req, res) => {
  const result = courseService.getCourses();
  res.json(result);
};

// 강의 상세 조회
exports.getCourseById = (req, res) => {
  const { lectureId } = req.params;
  const result = courseService.getCourseById(lectureId);
  res.json(result);
};

// 강의 생성 (교수 전용)
exports.createCourse = (req, res) => {
  const result = courseService.createCourse(req.body);
  res.status(201).json(result);
};
