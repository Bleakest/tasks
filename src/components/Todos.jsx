import React from "react";
import styles from "./Todos.module.css";
import Todo from "./Todo";

export default function Todos() {
  return (
    <div className={styles.container}>
      <Todo />
    </div>
  );
}
