const reportService = require('../services/report.service');

// 강의 리포트 조회
exports.getLectureReport = (req, res) => {
  const { lectureId } = req.params;
  const result = reportService.getLectureReport(lectureId);
  res.json(result);
};

// 개인 리포트 조회
exports.getUserReport = (req, res) => {
  const { userId } = req.params;
  const result = reportService.getUserReport(userId);
  res.json(result);
};

// 리포트 생성
exports.createReport = (req, res) => {
  const { userId } = req.params;
  const result = reportService.createReport(userId, req.body);
  res.status(201).json(result);
};

// 사용자 리포트 업데이트
exports.updateUserReport = (req, res) => {
  const { userId } = req.params;
  const updatedReport = reportService.updateUserReport(userId, req.body);
  res.status(200).json(updatedReport);
};
