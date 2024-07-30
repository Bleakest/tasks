import React, { useContext } from "react";
import styles from "./Todos.module.css";
import { AppContext } from "../context";

export const Todo = ({ todo }) => {
  const { todos, setRefreshTodos, refreshTodos } = useContext(AppContext);
  function handleDeleteBtn(target) {
    const itemToDelete = target.closest("div");
    console.log(itemToDelete);
    const arrElementToDelete = todos.find(
      (el) => el.id === Number(itemToDelete.id)
    );
    fetch(`http://localhost:8000/todos/${arrElementToDelete.id}`, {
      method: "DELETE",
    }).finally(() => setRefreshTodos(!refreshTodos));
  }

  function handleChangeBtn(target) {
    const newValue = prompt("Введите новое значение");
    const itemToChange = target.closest("div");
    const arrElToChange = todos.find((todo) => {
      return todo.id === Number(itemToChange.id);
    });
    fetch(`http://localhost:8000/todos/${arrElToChange.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: newValue,
      }),
    }).finally(() => setRefreshTodos(!refreshTodos));
  }

  return (
    <div id={todo.id} className={styles.todo} key={todo.id}>
      <p className={styles.todoTitle}>{todo.name}</p>
      <button
        onClick={({ target }) => handleChangeBtn(target)}
        className={styles.changeBtn}
      >
        изменить
      </button>
      <button
        onClick={({ target }) => handleDeleteBtn(target)}
        className={styles.deleteBtn}
      >
        Удалить
      </button>
    </div>
  );
};

export default Todo;
