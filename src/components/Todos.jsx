import React, { useEffect, useState } from "react";
import styles from "./Todos.module.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data));
  }, [refreshTodos]);

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

  function handleAlphabet() {
    if (isSorted) {
      fetch("http://localhost:8000/todos")
        .then((result) => result.json())
        .then((data) => setTodos(data));
      setIsSorted(!isSorted);
    } else {
      setTodos([...todos].sort((a, b) => a.name.localeCompare(b.name)));
      setIsSorted(!isSorted);
    }
  }

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
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              type="text"
            />
            <button onClick={() => handleAddBtn()} className={styles.addBtn}>
              Добавить
            </button>
          </div>
          <div className={styles.searchInput}>
            <button onClick={handleAlphabet}>
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
            <button onClick={() => handleSearchBtn()}>Подвердить</button>
          </div>
          {todos.map((todo) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
