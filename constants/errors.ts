export const errors = {
  COMMON: {
    SERVER: {
      message: "다시 시도해주세요.",
      code: "00001",
      status: 500,
    },
  },
  AUTH: {
    // 100...
    FAIL: {
      message: "다시 시도해주세요.",
      code: "10001",
      status: 500,
    },
  },
  USERS: {
    // 200...
    NO_LOGIN_TOKEN: {
      message: "정상적인 접근이 아닙니다.",
      code: "20001",
      status: 401,
    },
    NO_USERNAME: {
      message: "이름을 입력해주세요.",
      code: "20002",
      status: 400,
    },
    NO_APIKEY: {
      message: "API 키를 입력해주세요.",
      code: "20003",
      status: 400,
    },
    USERNAME_PATTERN: {
      message: "이름은 2자 이상 15자 이하여야 해요.",
      code: "20004",
      status: 400,
    },
  },
};
