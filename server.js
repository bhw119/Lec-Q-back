const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const uri =
  "mongodb+srv://bhw119:Qkrgusdn1!!@lec-q.116jn1m.mongodb.net/?retryWrites=true&w=majority&appName=Lec-Q";

// === 기본 설정 ===
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = 8080;

// 미들웨어
app.use(cors());
app.use(bodyParser.json());

// === MongoDB 연결 ===
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ======================
   📌 DB Schema 정의
====================== */

// 1. 사용자(User)
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, enum: ["student", "instructor"], required: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// 2. 강의(Course)
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  schedule: { start: Date, end: Date },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  materials: [String], // PDF 파일 경로 or GridFS ObjectId
  createdAt: { type: Date, default: Date.now },
});
const Course = mongoose.model("Course", courseSchema);

// 3. 질문(Question)
const questionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  page: Number, // 교안 페이지 위치
  isAnonymous: { type: Boolean, default: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  aiAnswer: String,
  instructorAnswer: String,
  createdAt: { type: Date, default: Date.now },
});
const Question = mongoose.model("Question", questionSchema);

// 4. 리포트(Report)
const reportSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  topQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  stats: {
    questionCount: Number,
    activeStudents: Number,
    wordCloud: [String],
  },
  createdAt: { type: Date, default: Date.now },
});
const Report = mongoose.model("Report", reportSchema);

/* ======================
   📌 API 라우트 예시
====================== */

// --- 회원가입 ---
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const newUser = new User({ email, password, name, role });
    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- 로그인 (단순 버전) ---
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.status(401).json({ success: false, message: "로그인 실패" });
  res.json({ success: true, user });
});

// --- 강의 개설 ---
app.post("/api/courses", async (req, res) => {
  try {
    const { title, description, instructorId, schedule } = req.body;
    const newCourse = new Course({
      title,
      description,
      instructor: instructorId,
      schedule,
    });
    await newCourse.save();
    res.json({ success: true, course: newCourse });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- 질문 등록 ---
app.post("/api/questions", async (req, res) => {
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

// --- 질문 Upvote ---
app.post("/api/questions/:id/upvote", async (req, res) => {
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

// --- 강의 리포트 생성 ---
app.post("/api/reports", async (req, res) => {
  try {
    const { courseId, topQuestions, stats } = req.body;
    const newReport = new Report({ course: courseId, topQuestions, stats });
    await newReport.save();
    res.json({ success: true, report: newReport });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ======================
   📌 서버 실행
====================== */
// === Socket.IO 설정 ===
io.on("connection", (socket) => {
  console.log("🟢 socket connected:", socket.id);

  // 실시간 필기 이벤트 (스켈레톤)
  socket.on("realtime_note:send", (payload) => {
    // namespace/room 설계는 추후 합의
    io.emit("realtime_note:broadcast", payload);
  });

  // 질문 upvote 이벤트 (스켈레톤)
  socket.on("question:upvote", (payload) => {
    io.emit("question:upvoted", payload);
  });

  socket.on("disconnect", () => {
    console.log("🔴 socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Lec-Q 서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
