import React, { useContext } from "react";
import styles from "./Todos.module.css";
import { TodosContext } from "../contex";

const Todo = () => {
  const {
    inputValue,
    setInputValue,
    handleAddBtn,
    setIsSorted,
    isSorted,
    searchInput,
    setSearchInput,
    sorted,
    handleChangeBtn,
    handleDeleteBtn,
  } = useContext(TodosContext);

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
            onChange={({ target }) => setInputValue(target.value)}
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
            onChange={({ target }) => setSearchInput(target.value)}
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
