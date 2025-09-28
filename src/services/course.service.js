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

// 강의 생성
exports.createCourse = ({ title, professor }) => {
  return {
    lectureId: Date.now().toString(),
    title,
    professor,
    status: "ongoing",
    message: "강의 생성 성공(Mock)"
  };
};
