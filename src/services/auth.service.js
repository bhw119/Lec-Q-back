const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// 회원가입
exports.signup = async ({ name, email, password, role, phoneNumber, birthDate }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("이미 존재하는 이메일입니다.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    phoneNumber,
    birthDate,
  });

  await newUser.save();

  return {
    message: "회원가입 성공",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      birthDate: newUser.birthDate,
    },
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

