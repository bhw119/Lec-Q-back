// LLM 연동 모듈 스켈레톤

// 모델 호출 (Mock)
exports.invokeModel = async ({ model = 'gpt-4o-mini', messages = [] }) => {
  return {
    model,
    inputTokens: messages.join(' ').length,
    output: '이것은 모의 LLM 응답입니다.',
    createdAt: new Date().toISOString()
  };
};

// 질문 요약 생성 (Mock)
exports.summarizeQuestions = async ({ lectureId, questions = [] }) => {
  return {
    lectureId,
    summary: '질문 요약(Mock)',
    items: questions.slice(0, 3)
  };
};

// 답변 생성 (Mock)
exports.generateAnswer = async ({ question, context }) => {
  return {
    answer: '모의 답변입니다.',
    confidence: 0.7
  };
};


