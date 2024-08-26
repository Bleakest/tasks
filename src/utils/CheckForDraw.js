import React from "react";
import { store } from "../store/store";
import { ACTION_TYPES } from "../store/action-types";

const CheckForDraw = () => {
  const { field, isGameEnded } = store.getState((state) => state);

  if (isGameEnded === false && !field.some((it) => it === "")) {
    store.dispatch({ type: ACTION_TYPES.SET_DRAW });
  }
};

export default CheckForDraw;
