const authService = require('../services/auth.service');

// ✅ 회원가입
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, birthDate } = req.body;

    // 필수 필드 검증
    if (!name || !email || !password || !role || !phoneNumber || !birthDate) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }

    const result = await authService.signup({ name, email, password, role, phoneNumber, birthDate });
    res.status(201).json({
      message: "회원가입 성공",
      user: result
    });
  } catch (error) {
    res.status(400).json({ message: "회원가입 실패", error: error.message });
  }
};

// ✅ 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "이메일과 비밀번호를 입력해주세요." });
    }

    const result = await authService.login({ email, password });
    res.status(200).json({
      message: "로그인 성공",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(401).json({ message: "로그인 실패", error: error.message });
  }
};



