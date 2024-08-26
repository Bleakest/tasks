import React from "react";
import { store } from "../store/store";
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

const CheckForWin = () => {
  const { field } = store.getState((state) => state);

  for (let i = 0; i < WIN_PATTERNS.length; i++) {
    if (
      WIN_PATTERNS[i].every((el) => field[el] === "x") ||
      WIN_PATTERNS[i].every((el) => field[el] === "y")
    ) {
      store.dispatch({ type: ACTION_TYPES.SET_WIN });
    }
  }
};

export default CheckForWin;
