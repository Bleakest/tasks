export const validatorConfig = {
  email: {
    required: "Введите логин",
    regex: {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Email невалиден",
    },
  },
  password: {
    required: "Введите пароль",
    regex: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/,
      message: "Пароль невалиден",
    },
  },
  repeatPassword: {
    required: "Введите пароль повторно",
    custom: {
      validate: (value, password) => value === password,
      message: "Пароли не совпадают",
    },
  },
};
