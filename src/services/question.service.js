// 특정 강의 질문 등록
exports.addQuestion = (lectureId, { page, content, anonymous }) => {
  if (!content) {
    throw new Error("질문 내용(content)은 필수입니다.");
  }
  return {
    questionId: Date.now().toString(),
    lectureId,
    page: page || null,
    content,
    anonymous: anonymous ?? true,
    createdAt: new Date().toISOString()
  };
};

// 특정 강의 질문 목록 조회
exports.getQuestions = (lectureId) => {
  return [
    {
      questionId: "q1",
      lectureId,
      content: "이 부분 다시 설명해주세요",
      anonymous: true,
      createdAt: "2025-09-28T21:20:00.000Z"
    },
    {
      questionId: "q2",
      lectureId,
      content: "예제 더 보여주세요",
      anonymous: false,
      createdAt: "2025-09-28T21:22:00.000Z"
    }
  ];
};

// 질문 상세 조회
exports.getQuestionById = (questionId) => {
  // 임시 Mock 데이터
  const questions = [
    { questionId: "1", lectureId: "1", content: "이 부분 다시 설명해주세요", page: 12, anonymous: true, createdAt: new Date().toISOString() },
    { questionId: "2", lectureId: "1", content: "예제 더 보여주세요", page: 5, anonymous: false, createdAt: new Date().toISOString() }
  ];

  return questions.find(q => q.questionId === questionId);
};


