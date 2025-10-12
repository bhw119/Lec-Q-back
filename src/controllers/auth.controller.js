const authService = require("../services/auth.service");

// 회원가입
exports.signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "회원가입 실패", error: error.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: "로그인 실패", error: error.message });
  }
};
