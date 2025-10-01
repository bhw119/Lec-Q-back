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

// 교안 업로드 (스켈레톤)
exports.uploadMaterial = (req, res) => {
  const { lectureId } = req.params;
  const { filename, filetype, size } = req.body; // 실제 구현 시 multer/gridfs 사용 예정
  const result = courseService.uploadMaterial(lectureId, { filename, filetype, size });
  res.status(201).json(result);
};

// 실시간 필기 데이터 전송 (스켈레톤)
exports.sendRealtimeNote = (req, res) => {
  const { lectureId } = req.params;
  const { userId, content, timestamp } = req.body;
  const result = courseService.receiveRealtimeNote(lectureId, { userId, content, timestamp });
  res.status(201).json(result);
};
