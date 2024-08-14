import { CHANGE_TODO } from "../types";

const changeUser = (id, value) => {
  return fetch(`http://localhost:8000/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      name: value,
    }),
  });
};
export const changeTodoAction = (id, value) => (dispatch) => {
  return changeUser(id, value).then(() =>
    dispatch({
      type: CHANGE_TODO,
    })
  );
};
