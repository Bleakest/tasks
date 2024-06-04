import { useState } from "react";
import styles from "./app.module.css";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const isValueValid = value.length >= 3 ? true : false;

  function onInputButtonClick() {
    const promptValue = prompt();
    if (promptValue.length < 3) {
      setError("Строка содержит менее 3 символов");
    } else if (promptValue.length >= 3) {
      setValue(promptValue);
      setError("");
    }
  }

  function onAddButtonClick() {
    if (isValueValid) {
      setList((prev) => {
        return [...prev, { id: Date.now(), value }];
      });
      setValue("");
      setError("");
    }
  }

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error !== "" ? <div className={styles["error"]}>{error}</div> : null}
      <div className={styles["buttons-container"]}>
        <button
          className={styles["button"]}
          onClick={() => onInputButtonClick()}
        >
          Ввести новое
        </button>
        <button
          className={styles["button"]}
          onClick={() => onAddButtonClick()}
          disabled={!isValueValid}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>

        <ul className={styles["list"]}>
          {list.length ? (
            list.map((i) => (
              <li key={i.id} className={styles["list-item"]}>
                {i.value}
              </li>
            ))
          ) : (
            <p className={styles["no-margin-text"]}>
              Нет добавленных элементов
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
