import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Todos.module.css";

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
      method: "PATCH",
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

export default TodoModal;
