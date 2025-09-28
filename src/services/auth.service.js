exports.signup = ({ email, password, name, role }) => {
  return {
    userId: Date.now().toString(),
    email,
    name,
    role,
    message: "회원가입 성공(Mock)"
  };
};

exports.login = ({ email, password }) => {
  if (!email || !password) {
    throw new Error("이메일과 비밀번호가 필요합니다.");
  }
  return {
    accessToken: "mock_access_token",
    refreshToken: "mock_refresh_token"
  };
};

