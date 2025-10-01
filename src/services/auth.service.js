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


// LLM 연동 테스트용 토큰 검증/발급 훅 (스켈레톤)
exports.issueLLMServiceToken = ({ userId }) => {
  return {
    userId,
    llmServiceToken: "mock_llm_service_token",
    expiresIn: 3600
  };
};
