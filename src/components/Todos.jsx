import React, { useContext, useState } from "react";
import styles from "./Todos.module.css";
import Todo from "./Todo";
import { AppContext } from "../context";

export default function Todos() {
  const {
    todos,
    setTodos,
    inputValue,
    setInputValue,
    setRefreshTodos,
    refreshTodos,
    isSorted,
    setIsSorted,
    searchInput,
    setSearchInput,
  } = useContext(AppContext);

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

  function handleSearchBtn() {
    let newArr = [];

    todos.forEach((element) => {
      if (element.name.includes(searchInput)) {
        newArr.push(element);
      }
    });

    setTodos(newArr);
  }

  console.log(todos);

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
            <Todo todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
}
