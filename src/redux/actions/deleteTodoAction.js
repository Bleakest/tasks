import { DELETE_TODO } from "../types";

const deleteUser = (id) => {
  return fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
  });
};

export const deleteTodoAction = (id) => async (dispatch) => {
  await deleteUser(id);
  dispatch({
    type: DELETE_TODO,
    payload: id,
  });
};
