// 강의 리포트 조회
exports.getLectureReport = (lectureId) => {
  return {
    lectureId,
    summary: "학생들의 이해도가 75% 수준입니다.",
    difficultSections: ["메모리 관리", "동기화"],
    recommendations: "추가 자료 제공 필요"
  };
};

// 개인 리포트 조회
exports.getUserReport = (userId) => {
  return {
    userId,
    progress: "80%",
    strengths: ["자료구조", "네트워크"],
    weaknesses: ["운영체제"],
    nextSteps: "운영체제 복습 권장"
  };
};

// 리포트 생성
exports.createReport = (userId, data) => {
  return {
    userId,
    ...data,
    createdAt: new Date().toISOString(),
    message: "리포트 생성 성공(Mock)"
  };
};

// 사용자 리포트 업데이트
exports.updateUserReport = (userId, { progress, strengths, weaknesses, nextSteps }) => {
  return {
    reportId: userId, // 실제 DB 쓰면 reportId로 교체
    userId,
    progress,
    strengths,
    weaknesses,
    nextSteps,
    message: "사용자 리포트 업데이트 성공(Mock)"
  };
};

// LLM 요약 생성 (스켈레톤)
exports.generateLLMSummary = ({ lectureId, questions }) => {
  return {
    lectureId,
    summary: "LLM이 생성한 요약(Mock)",
    questionsCount: Array.isArray(questions) ? questions.length : 0
  };
};

