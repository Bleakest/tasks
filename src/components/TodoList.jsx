import React, { useEffect, useRef } from "react";
import styles from "./Todos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInputAction,
  addTodoAction,
  initTodoAction,
  changeIsSortedAction,
  changeSearchAction,
} from "../redux/actions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const InputRef = useRef(null);

  useEffect(() => {
    dispatch(initTodoAction());
  }, []);

  const { isSorted, todos } = useSelector((state) => state.todoState);

  function handleInputValue(text) {
    // dispatch(changeInputAction(text));
  }

  function handleAddBtn() {
    dispatch(addTodoAction(InputRef.current.value));
    InputRef.current.value = "";
  }

  function handleSetIsSorted() {
    // dispatch(changeIsSortedAction());
  }

  function handleSearchValue(text) {
    // dispatch(changeSearchAction(text));
  }

  const sorted = isSorted
    ? [...todos].sort((a, b) => a.name.localeCompare(b.name))
    : todos;

  return (
    <div className={styles.container}>
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
              ref={InputRef}
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
              // value={searchInput}
              // onChange={({ target }) => handleSearchValue(target.value)}
            />
          </div>
          {sorted.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
