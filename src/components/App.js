import styles from "./App.module.css";
import Form from "./Form";
import SecondForm from "./SecondForm";

export default function App() {
  return (
    <div className={styles["container"]}>
      <Form />
      <SecondForm />
    </div>
  );
}
