import { ADD_TODO } from "../types";

const addUser = (inputValue) => {
  return fetch("http://localhost:8000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      name: inputValue,
    }),
  });
};

export const addTodoAction = (inputValue) => (dispatch) => {
  return addUser(inputValue).then(() =>
    dispatch({
      type: ADD_TODO,
    })
  );
};
