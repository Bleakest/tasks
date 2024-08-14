import { INIT_TODO } from "../types";

const getUsers = () =>
  fetch("http://localhost:8000/todos")
    .then((response) => response.json())
    .then((users) => users);

export const initTodoAction = () => (dispatch) => {
  return getUsers().then((dataFromServer) =>
    dispatch({
      type: INIT_TODO,
      payload: dataFromServer,
    })
  );
};
