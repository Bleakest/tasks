import React, { useEffect, useRef, useState } from "react";
import styles from "./Todos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAction, initTodoAction } from "../redux/actions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const InputRef = useRef(null);
  const [isSorted, setIsSorted] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(initTodoAction());
  }, []);

  const todos = useSelector((state) => state.todos);

  function handleAddBtn() {
    dispatch(addTodoAction(InputRef.current.value));
    InputRef.current.value = "";
  }

  const filtred = searchInput
    ? todos.filter((item) => item.name.includes(searchInput))
    : todos;

  const sorted = isSorted
    ? [...filtred].sort((a, b) => a.name.localeCompare(b.name))
    : filtred;

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
              type="text"
            />
            <button onClick={() => handleAddBtn()} className={styles.addBtn}>
              Добавить
            </button>
          </div>
          <div className={styles.searchInput}>
            <button onClick={() => setIsSorted(!isSorted)}>
              {isSorted
                ? "Вернуть начальное значение"
                : "Сортировать по алфавиту"}
            </button>
            <input
              type="text"
              placeholder="Найти задачу"
              style={{ padding: "6px", marginRight: "10px" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
