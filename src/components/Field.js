import React, { useEffect } from "react";
import styles from "./Field.module.css";
import { ACTION_TYPES } from "../store/action-types";
import { useDispatch, useSelector } from "react-redux";

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
  const { field, isGameEnded, currentPlayer } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleClick(index) {
    if (!isGameEnded) {
      let newArr = field.slice();
      newArr[index] = currentPlayer;
      dispatch({ type: ACTION_TYPES.SET_FIELD, payload: newArr });
      dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
    }
  }

  useEffect(() => {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      if (
        WIN_PATTERNS[i].every((el) => field[el] === "x") ||
        WIN_PATTERNS[i].every((el) => field[el] === "y")
      ) {
        dispatch({ type: ACTION_TYPES.SET_WIN });
        dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
      } else if (isGameEnded === false && !field.some((it) => it === "")) {
        dispatch({ type: ACTION_TYPES.SET_DRAW });
      }
    }
  }, [field]);

  function handleReset() {
    dispatch({ type: ACTION_TYPES.RESET });
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
