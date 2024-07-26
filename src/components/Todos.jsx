import React, { useEffect, useState } from "react";
import styles from "./Todos.module.css";
import {
  Link,
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";

const TodoModal = () => {
  const [task, setTask] = useState({});
  const params = useParams();
  const [refreshTask, setRefreshTask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/todos/${params.id}`)
      .then((data) => data.json())
      .then((res) => setTask(res));
  }, [refreshTask]);

  function handleChangeBtn() {
    const newValue = prompt("Введите новое значение");
    fetch(`http://localhost:8000/todos/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: newValue,
      }),
    }).finally(() => setRefreshTask(!refreshTask));
  }

  function handleDeleteBtn() {
    fetch(`http://localhost:8000/todos/${params.id}`, {
      method: "DELETE",
    }).finally(() => navigate("/"));
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      <div className={styles["todo-modal"]}>
        <p>{task.name}</p>
        <button onClick={() => handleChangeBtn()} className={styles.changeBtn}>
          изменить
        </button>
        <button onClick={() => handleDeleteBtn()} className={styles.deleteBtn}>
          Удалить
        </button>
      </div>
    </>
  );
};

const TodoList = ({ todos, setTodos, refreshTodos, setRefreshTodos }) => {
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

      {todos.map((todo) => {
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

const NotFound = () => <div>Такая страница не существует</div>;

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data));
  }, [refreshTodos]);

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>TodoList</h2>

        <Routes>
          <Route
            path="/"
            element={
              <TodoList
                todos={todos}
                setTodos={setTodos}
                setRefreshTodos={setRefreshTodos}
                refreshTodos={refreshTodos}
              />
            }
          />
          <Route path="/task/:id" element={<TodoModal />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace={true} />} />
        </Routes>
      </div>
    </div>
  );
}
