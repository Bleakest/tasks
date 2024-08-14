import { DELETE_TODO } from "../types";

const deleteUser = (id) => {
  return fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
  });
};

export const deleteTodoAction = (id) => (dispatch) => {
  return deleteUser(id).then(() =>
    dispatch({
      type: DELETE_TODO,
    })
  );
};
