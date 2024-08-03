import { createContext, useEffect, useState } from "react";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
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

  function handleDeleteBtn(id) {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    }).finally(() => setRefreshTodos(!refreshTodos));
  }

  function handleChangeBtn(id) {
    const newValue = prompt("Введите новое значение");
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: newValue,
      }),
    }).finally(() => setRefreshTodos(!refreshTodos));
  }

  useEffect(() => {
    let newArr = [];

    todos.forEach((element) => {
      if (element.name.includes(searchInput)) {
        newArr.push(element);
      }
    });

    if (searchInput) {
      setTodos(newArr);
    } else {
      setRefreshTodos(!refreshTodos);
    }
  }, [searchInput]);

  const sorted = isSorted
    ? [...todos].sort((a, b) => a.name.localeCompare(b.name))
    : todos;

  return (
    <TodosContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
