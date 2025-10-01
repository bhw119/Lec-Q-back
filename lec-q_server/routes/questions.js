// 질문 관련

const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/", async (req, res) => {
  try {
    const { courseId, authorId, content, page, isAnonymous } = req.body;
    const newQuestion = new Question({
      course: courseId,
      author: authorId,
      content,
      page,
      isAnonymous,
    });
    await newQuestion.save();
    res.json({ success: true, question: newQuestion });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post("/:id/upvote", async (req, res) => {
  try {
    const { userId } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ success: false, message: "질문 없음" });

    if (!question.upvotes.includes(userId)) {
      question.upvotes.push(userId);
      await question.save();
    }

    res.json({ success: true, question });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
