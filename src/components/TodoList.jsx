import { useEffect, useState } from "react";
import styles from "./Todos.module.css";
import { Link } from "react-router-dom";

export const TodoList = ({
  todos,
  setTodos,
  refreshTodos,
  setRefreshTodos,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  function handleAddBtn() {
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: inputValue,
      }),
    })
      .then(() => setInputValue(""))
      .finally(() => setRefreshTodos(!refreshTodos));
  }

  function handleSearchBtn() {
    let newArr = [];

    todos.forEach((element) => {
      if (element.name.includes(searchInput)) {
        newArr.push(element);
      }
    });

    setTodos(newArr);
  }

  useEffect(() => {
    setRefreshTodos(!refreshTodos);
  }, [searchInput]);

  const sorted = isSorted
    ? [...todos].sort((a, b) => a.name.localeCompare(b.name))
    : todos;

  return (
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
          {isSorted ? "Вернуть начальное значение" : "Сортировать по алфавиту"}
        </button>
        <input
          type="text"
          placeholder="Найти задачу"
          style={{ padding: "6px", marginRight: "10px" }}
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
        />
        <button onClick={() => handleSearchBtn()}>Подвердить</button>
      </div>

      {sorted.map((todo) => {
        return (
          <Link
            to={`/task/${todo.id}`}
            id={todo.id}
            className={styles.todo}
            key={todo.id}
          >
            <p className={styles.todoTitle}>{todo.name}</p>
          </Link>
        );
      })}
    </div>
  );
};
