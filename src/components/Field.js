import React, { useEffect } from "react";
import styles from "./Field.module.css";
import PropTypes from "prop-types";

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

function FieldLayout({ field, handleClick, handleButton }) {
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
      <button onClick={() => handleButton()} style={{ marginTop: "10px" }}>
        Начать заново
      </button>
    </div>
  );
}

export default function Field({
  field,
  setField,
  currentPlayer,
  setCurrentPlayer,
  isGameEnded,
  setIsGameEnded,
  setIsDraw,
}) {
  function togglePlayer() {
    if (currentPlayer === "x") {
      setCurrentPlayer("y");
    } else {
      setCurrentPlayer("x");
    }
  }

  function handleButton() {
    setCurrentPlayer("x");
    setIsGameEnded(false);
    setIsDraw(false);
    setField(["", "", "", "", "", "", "", "", ""]);
  }

  function handleClick(index) {
    if (!isGameEnded) {
      let newArr = field.slice();
      newArr[index] = currentPlayer;
      setField(newArr);
      togglePlayer();
    }
  }

  useEffect(() => {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      if (
        WIN_PATTERNS[i].every((el) => field[el] === "x") ||
        WIN_PATTERNS[i].every((el) => field[el] === "y")
      ) {
        setIsGameEnded(true);
        togglePlayer();
      } else if (isGameEnded === false && !field.some((it) => it === "")) {
        setIsDraw(true);
      }
    }
  }, field);

  return (
    <div>
      <FieldLayout
        handleButton={handleButton}
        handleClick={handleClick}
        field={field}
      />
    </div>
  );
}

FieldLayout.propTypes = {
  field: PropTypes.array,
  setField: PropTypes.func,
  currentPlayer: PropTypes.string,
  setCurrentPlayer: PropTypes.func,
  isGameEnded: PropTypes.bool,
  setIsGameEnded: PropTypes.func,
  setIsDraw: PropTypes.func,
};
