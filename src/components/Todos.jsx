import styles from "./Todos.module.css";

export default function Todos({ children }) {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>TodoList</h2>
        {children}
      </div>
    </div>
  );
}
