const Course = require('../models/course.model');

// 강의 목록 조회
exports.getCourses = () => {
  return [
    { lectureId: "1", title: "알고리즘", professor: "김교수", status: "ongoing" },
    { lectureId: "2", title: "운영체제", professor: "박교수", status: "ended" }
  ];
};

// 강의 상세 조회
exports.getCourseById = (lectureId) => {
  return {
    lectureId,
    title: "운영체제",
    professor: "박교수",
    status: "ongoing",
    description: "운영체제 핵심 개념 강의"
  };
};

// MongoDB에 강의 생성
exports.createCourse = async ({ title, professor }) => {
  const newCourse = new Course({
    title,
    professor,
    status: 'ongoing',
    description: `${title} 강의`
  });

  await newCourse.save();

  return {
    lectureId: newCourse._id,
    title: newCourse.title,
    professor: newCourse.professor,
    status: newCourse.status,
    message: '강의 생성 성공(DB 저장)'
  };
};

// 교안 업로드 (Mock)
exports.uploadMaterial = (lectureId, { filename, filetype, size }) => {
  return {
    lectureId,
    materialId: Date.now().toString(),
    filename: filename || 'material.pdf',
    filetype: filetype || 'application/pdf',
    size: size || 0,
    uploadedAt: new Date().toISOString(),
    message: '교안 업로드 성공(Mock)'
  };
};

// 실시간 필기 데이터 수신/저장 (Mock)
exports.receiveRealtimeNote = (lectureId, { userId, content, timestamp }) => {
  return {
    lectureId,
    userId,
    content,
    timestamp: timestamp || new Date().toISOString(),
    message: '실시간 노트 수신(Mock)'
  };
};

// ✅ 실제 파일 업로드 후 DB에 반영
exports.saveUploadedMaterial = async (lectureId, pdfUrl) => {
  const course = await Course.findById(lectureId);
  if (!course) throw new Error('해당 강의를 찾을 수 없습니다.');

  course.pdfUrl = pdfUrl;
  await course.save();

  return course;
};
