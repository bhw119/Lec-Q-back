const questionService = require('../services/question.service');

// 질문 등록
exports.createQuestion = (req, res) => {
  const { lectureId } = req.params;
  const { page, content, anonymous } = req.body;

  const result = questionService.createQuestion({
    lectureId,
    page,
    content,
    anonymous,
  });

  res.status(201).json(result);
};

// 특정 강의 질문 목록 조회
exports.getQuestionsByLecture = (req, res) => {
  const { lectureId } = req.params;
  const result = questionService.getQuestionsByLecture(lectureId);
  res.json(result);
};

// 특정 질문 상세 조회
exports.getQuestionById = (req, res) => {
  const { questionId } = req.params;
  const result = questionService.getQuestionById(questionId);

  if (!result) {
    return res.status(404).json({ message: '질문을 찾을 수 없습니다.' });
  }

  res.json(result);
};

// 질문 Upvote
exports.upvoteQuestion = (req, res) => {
  const { questionId } = req.params;
  const { userId } = req.body;
  const result = questionService.upvoteQuestion(questionId, userId);
  res.status(200).json(result);
};

// 강의자 답변 등록
exports.answerByInstructor = (req, res) => {
  const { questionId } = req.params;
  const { instructorId, answer } = req.body;
  const result = questionService.answerQuestionByInstructor(questionId, { instructorId, answer });
  res.status(201).json(result);
};

// AI 답변 등록
exports.answerByAI = (req, res) => {
  const { questionId } = req.params;
  const { model, answer } = req.body;
  const result = questionService.answerQuestionByAI(questionId, { model, answer });
  res.status(201).json(result);
};



