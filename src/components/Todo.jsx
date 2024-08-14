import React, { useEffect } from "react";
import styles from "./Todos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  initTodoAction,
  addTodoAction,
  changeInputAction,
  handleSearch,
  deleteTodoAction,
  changeTodoAction,
  changeIsSortedAction,
  changeSearchAction,
} from "../redux/actions";

const Todo = () => {
  const dispatch = useDispatch();
  const { inputValue, isSorted, todos } = useSelector(
    (state) => state.todoState
  );

  const { searchInput } = useSelector((state) => state.searchState);

  async function handleAddBtn() {
    await dispatch(addTodoAction(inputValue));
    dispatch(initTodoAction());
  }
  async function handleDeleteBtn(id) {
    await dispatch(deleteTodoAction(id));
    dispatch(initTodoAction());
  }
  async function handleChangeBtn(id) {
    const value = prompt("Введите новое значение");
    await dispatch(changeTodoAction(id, value));
    dispatch(initTodoAction());
  }
  function handleInputValue(text) {
    dispatch(changeInputAction(text));
  }
  function handleSetIsSorted() {
    dispatch(changeIsSortedAction());
  }
  function handleSearchValue(text) {
    dispatch(changeSearchAction(text));
  }

  useEffect(() => {
    let newArr = [];

    todos.forEach((element) => {
      if (element.name.includes(searchInput)) {
        newArr.push(element);
      }
    });

    if (searchInput) {
      dispatch(handleSearch(newArr));
    } else {
      dispatch(initTodoAction());
    }
  }, [searchInput]);

  const sorted = isSorted
    ? [...todos].sort((a, b) => a.name.localeCompare(b.name))
    : todos;

  return (
    <div>
      <h2 className={styles.title}>TodoList</h2>
      <div className={styles.todoList}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <input
            className={styles.inputValue}
            placeholder="Создать задачу"
            value={inputValue}
            onChange={({ target }) => handleInputValue(target.value)}
            type="text"
          />
          <button onClick={() => handleAddBtn()} className={styles.addBtn}>
            Добавить
          </button>
        </div>
        <div className={styles.searchInput}>
          <button onClick={() => handleSetIsSorted()}>
            {isSorted
              ? "Вернуть начальное значение"
              : "Сортировать по алфавиту"}
          </button>
          <input
            type="text"
            placeholder="Найти задачу"
            style={{ padding: "6px", marginRight: "10px" }}
            value={searchInput}
            onChange={({ target }) => handleSearchValue(target.value)}
          />
        </div>
        {sorted.map((todo) => {
          return (
            <div id={todo.id} className={styles.todo} key={todo.id}>
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
        })}
      </div>
    </div>
  );
};

export default Todo;
