// 실제 DB 연동 전, Mock 데이터 기반 테스트용 서비스

exports.signup = ({ email, password, name, role, phoneNumber, birthDate }) => {
  // 간단한 필수 필드 검증
  if (!email || !password || !name || !role || !phoneNumber || !birthDate) {
    throw new Error("모든 필드를 입력해야 합니다.");
  }

  // 회원가입 성공 시 Mock 응답
  return {
    userId: Date.now().toString(),
    email,
    name,
    email,
    password: hashedPassword,
    role,
    phoneNumber,
    birthDate,
    message: "회원가입 성공(Mock)"
  };
};

exports.login = ({ email, password }) => {
  if (!email || !password) {
    throw new Error("이메일과 비밀번호가 필요합니다.");
  }

  // 로그인 성공 시 Mock 응답
  return {
    accessToken: "mock_access_token",
    refreshToken: "mock_refresh_token",
    user: {
      id: "mock_user_id",
      email,
      name: "홍길동",
      role: "student"
    },
    message: "로그인 성공(Mock)"
  };
};

// 로그인
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("존재하지 않는 이메일입니다.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("비밀번호가 일치하지 않습니다.");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "lecq-secret-key",
    { expiresIn: "1h" }
  );

  return {
    message: "로그인 성공",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

