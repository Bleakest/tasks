import { CHANGE_TODO } from "../types";

export const changeInputAction = (text) => {
  return {
    type: CHANGE_TODO,
    payload: text,
  };
};
