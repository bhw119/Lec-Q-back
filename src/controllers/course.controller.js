const courseService = require('../services/course.service');
const multer = require('multer');
const path = require('path');

// ---------------------------
// ✅ multer 설정 (PDF 전용)
// ---------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 저장 폴더
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('PDF 파일만 업로드 가능합니다.'));
    }
    cb(null, true);
  }
});

// ---------------------------
// 📄 실제 교안 업로드 (PDF 전용)
// ---------------------------
exports.uploadRealMaterial = [
  upload.single('lectureFile'), // form-data key 이름
  async (req, res) => {
    try {
      const { lectureId } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: '파일이 없습니다.' });
      }

      const filePath = `/uploads/${req.file.filename}`;
      const updatedCourse = await courseService.saveUploadedMaterial(lectureId, filePath);

      res.status(200).json({
        message: 'PDF 교안이 성공적으로 업로드되었습니다.',
        course: updatedCourse
      });
    } catch (error) {
      res.status(500).json({ message: '업로드 실패', error: error.message });
    }
  }
];

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
exports.createCourse = async (req, res) => {
  const result = await courseService.createCourse(req.body);
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
