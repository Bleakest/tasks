import styles from "./SecondForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const fieldsScheme = yup.object().shape({
  login: yup
    .string()
    .matches(
      !/^[\w_]*$/,
      "Должны использоваться буквы, цифры и нижнее подчеркивание"
    )
    .max(20, "Должно быть меньше 20 символов")
    .min(3, "Должно быть больше трех символов"),
  password: yup.string().min(5, "Должно быть больше 5 символов"),
  repeatPass: yup.string().matches(),
});

const sendFormData = (formData) => {
  console.log(formData);
};

export default function SecondForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
    },
    resolver: yupResolver(fieldsScheme),
  });

  const loginError = errors.login?.message;
  return (
    <form onSubmit={handleSubmit(sendFormData)} className={styles["form"]}>
      <h2 className={styles["title"]}>SecondForm</h2>

      <div className={styles["error"]}>{errors.login?.message}</div>

      <div>
        <input type="text" placeholder="Введите email" {...register("login")} />
        <input
          type="password"
          required
          placeholder="Введите password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          {...register("repeatPass")}
        />
      </div>

      <button
        type="submit"
        value="Зарегистрироваться"
        className={styles["button"]}
        disabled={loginError !== null}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
