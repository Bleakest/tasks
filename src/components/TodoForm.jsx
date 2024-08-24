import React from "react";
import styles from "./Todos.module.css";
import TodoList from "./TodoList";

export default function TodoForm() {
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
}
