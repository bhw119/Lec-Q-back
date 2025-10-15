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


// LLM 연동 테스트용 토큰 검증/발급 훅 (스켈레톤)
exports.issueLLMServiceToken = ({ userId }) => {
  return {
    userId,
    llmServiceToken: "mock_llm_service_token",
    expiresIn: 3600
  };
};
