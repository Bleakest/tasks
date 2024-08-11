import React, { useEffect } from "react";
import styles from "./Field.module.css";
import store from "../store/store";
import { ACTION_TYPES } from "../store/action-types";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Варианты побед по горизонтали
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Варианты побед по вертикали
  [0, 4, 8],
  [2, 4, 6], // Варианты побед по диагонали
];

function FieldLayout({ field, handleClick, handleReset }) {
  return (
    <div className={styles["fieldContainer"]}>
      {field.map((item, index) => {
        return (
          <div
            onClick={() => handleClick(index)}
            className={styles["field"]}
            key={index}
          >
            <div>{item}</div>
          </div>
        );
      })}
      <button onClick={() => handleReset()} style={{ marginTop: "10px" }}>
        Начать заново
      </button>
    </div>
  );
}

export default function Field() {
  const { field, isGameEnded, currentPlayer } = store.getState();

  function handleClick(index) {
    console.log(store.getState());

    if (!isGameEnded) {
      let newArr = field.slice();
      newArr[index] = currentPlayer;
      store.dispatch({ type: ACTION_TYPES.SET_FIELD, payload: newArr });
      store.dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
    }
  }

  useEffect(() => {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      if (
        WIN_PATTERNS[i].every((el) => field[el] === "x") ||
        WIN_PATTERNS[i].every((el) => field[el] === "y")
      ) {
        store.dispatch({ type: ACTION_TYPES.SET_WIN });
        store.dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
      } else if (isGameEnded === false && !field.some((it) => it === "")) {
        store.dispatch({ type: ACTION_TYPES.SET_DRAW });
      }
    }
  }, field);

  function handleReset() {
    store.dispatch({ type: ACTION_TYPES.RESET });
  }

  return (
    <div>
      <FieldLayout
        handleReset={handleReset}
        handleClick={handleClick}
        field={field}
      />
    </div>
  );
}
