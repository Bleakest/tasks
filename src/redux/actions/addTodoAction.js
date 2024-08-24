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

export const addTodoAction = (inputValue) => async (dispatch) => {
  const response = await addUser(inputValue);
  const user = await response.json();

  dispatch({
    type: ADD_TODO,
    payload: user,
  });
};
