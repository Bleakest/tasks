import React, { useState, useRef, useEffect } from "react";
import styles from "./Form.module.css";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeat: "",
  });

  const submitButtonRef = useRef(null);
  const [error, setError] = useState("");

  function sendFormData(data) {
    console.log(data);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (formData.password !== formData.repeat) {
      setError("Данные о пароле не совпадают");
    } else {
      sendFormData(formData);
    }
  }

  function onLoginChange({ target }) {
    setFormData({ ...formData, email: target.value });

    let newError = null;

    if (!/^[\w_]*$/.test(target.value)) {
      newError =
        "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание";
    } else if (target.value.length > 15) {
      newError = "Неверный логин. Должно быть не больше 20 символов";
    }

    setError(newError);
  }

  function onPasswordChange({ target }) {
    setFormData({ ...formData, password: target.value });

    let newError = null;

    setError(newError);
  }

  function onPasswordBlur() {
    if (formData.password.length < 5) {
      setError("Неверный пароль. Должно быть не меньше 3 символов");
    }
  }

  function onRepeatChange({ target }) {
    setFormData({ ...formData, repeat: target.value });
  }

  useEffect(() => {
    if (formData.password === formData.repeat && formData.password > 4) {
      submitButtonRef.current.focus();
    }
  }, [formData]);

  return (
    <form onSubmit={onSubmit} className={styles["form"]}>
      <h2 className={styles["title"]}>Form</h2>
      {error && <div className={styles["error"]}>{error}</div>}
      <div>
        <input
          type="text"
          value={formData.email}
          placeholder="Введите email"
          onChange={onLoginChange}
        />
        <input
          type="password"
          value={formData.password}
          required
          placeholder="Введите password"
          onBlur={onPasswordBlur}
          onChange={onPasswordChange}
        />
        <input
          value={formData.repeat}
          onChange={onRepeatChange}
          type="password"
          placeholder="Повторите пароль"
        />
      </div>

      <button
        ref={submitButtonRef}
        type="submit"
        value="Зарегистрироваться"
        className={styles["button"]}
        disabled={error !== null}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
