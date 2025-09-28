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



