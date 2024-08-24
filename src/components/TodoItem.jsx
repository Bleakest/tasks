import React from "react";
import styles from "./Todos.module.css";
import { useDispatch } from "react-redux";
import { deleteTodoAction, changeTodoAction } from "../redux/actions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  function handleDeleteBtn(id) {
    dispatch(deleteTodoAction(id));
  }
  async function handleChangeBtn(id) {
    const value = prompt("Введите новое значение");
    dispatch(changeTodoAction(id, value));
  }

  return (
    <div className={styles.todo}>
      <p className={styles.todoTitle}>{todo.name}</p>
      <button
        onClick={() => handleChangeBtn(todo.id)}
        className={styles.changeBtn}
      >
        изменить
      </button>
      <button
        onClick={() => handleDeleteBtn(todo.id)}
        className={styles.deleteBtn}
      >
        Удалить
      </button>
    </div>
  );
};

export default TodoItem;
