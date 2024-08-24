import React from "react";
import styles from "./Todos.module.css";
import { useDispatch } from "react-redux";
import {
  initTodoAction,
  deleteTodoAction,
  changeTodoAction,
} from "../redux/actions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  async function handleDeleteBtn(id) {
    await dispatch(deleteTodoAction(id));
    dispatch(initTodoAction());
  }
  async function handleChangeBtn(id) {
    const value = prompt("Введите новое значение");
    await dispatch(changeTodoAction(id, value));
    dispatch(initTodoAction());
  }

  // useEffect(() => {
  //   let newArr = [];

  //   todos.forEach((element) => {
  //     if (element.name.includes(searchInput)) {
  //       newArr.push(element);
  //     }
  //   });

  //   if (searchInput) {
  //     dispatch(handleSearch(newArr));
  //   } else {
  //     dispatch(initTodoAction());
  //   }
  // }, [searchInput]);

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
