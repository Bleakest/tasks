import React, { useState, useRef, useEffect } from "react";
import styles from "./Form.module.css";
import { validatorConfig } from "./validator-config";
import TextField from "./TextField";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
    repeatPassword: null,
  });

  const submitButtonRef = useRef(null);

  const validate = (name, value) => {
    const config = validatorConfig[name];
    let error = null;

    switch (true) {
      case !value:
        error = config.required;
        break;

      case config.regex && !config.regex.pattern.test(value):
        error = config.regex.message;
        break;

      case config.custom && !config.custom.validate(value, formData.password):
        error = config.custom.message;
        break;

      default:
        error = null;
    }

    return error;
  };

  function sendFormData(data) {
    console.log(data);
  }

  function onSubmit(event) {
    event.preventDefault();
    sendFormData(formData);
  }

  function handleBlur({ target }) {
    const { name, value } = target;

    const error = validate(name, value);
    setError((prev) => ({ ...prev, [name]: error }));
  }

  let isValid = Object.values(error).every((e) => !e);
  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: null }));
  };

  return (
    <form onSubmit={onSubmit} className={styles["form"]}>
      <h2 className={styles["title"]}>Form</h2>
      {error.email && <div className={styles["error"]}>{error.email}</div>}
      {error.password && (
        <div className={styles["error"]}>{error.password}</div>
      )}
      {error.repeatPassword && (
        <div className={styles["error"]}>{error.repeatPassword}</div>
      )}
      <div className={styles["form-container"]}>
        <TextField
          type="text"
          name="email"
          placeholder="Введите email"
          value={formData.email}
          error={error.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          type="text"
          name="password"
          placeholder="Введите пароль"
          value={formData.password}
          error={error.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          type="text"
          name="repeatPassword"
          placeholder="Повторите пароль"
          value={formData.repeatPassword}
          error={error.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <button
        ref={submitButtonRef}
        disabled={!isValid}
        type="submit"
        value="Зарегистрироваться"
        className={styles["button"]}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
