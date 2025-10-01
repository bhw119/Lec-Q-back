// 리포트 관련

const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

router.post("/", async (req, res) => {
  try {
    const { courseId, topQuestions, stats } = req.body;
    const newReport = new Report({ course: courseId, topQuestions, stats });
    await newReport.save();
    res.json({ success: true, report: newReport });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
