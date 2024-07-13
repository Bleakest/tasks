import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./SecondForm.module.css";

const sendFormData = (formData) => {
  console.log(formData);
};

const fieldsSchema = yup.object().shape({
  login: yup
    .string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]{0,20}$/,
      "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
      "Пароль небезопасный. Попробуйте ввести другой"
    ),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export default function SecondForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(fieldsSchema),
  });

  const loginError = errors.login?.message;
  const passwordError = errors.password?.message;
  const passwordRepeatError = errors.repeatPassword?.message;

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(sendFormData)}>
        <h2 className={styles.title}>SecondForm</h2>
        {loginError && <div className={styles.error}>{loginError}</div>}
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        {passwordRepeatError && (
          <div className={styles.error}>{passwordRepeatError}</div>
        )}
        <div>
          <input
            placeholder="Введите email"
            name="login"
            type="text"
            {...register("login")}
          />
          <input
            placeholder="Введите password"
            name="password"
            type="password"
            {...register("password")}
          />
          <input
            placeholder="Повторите password"
            name="repeatPassword"
            type="password"
            {...register("repeatPassword")}
          />
        </div>
        <button className={styles.button} type="submit" disabled={!!loginError}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
