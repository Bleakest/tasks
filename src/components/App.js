import React, { useState } from "react";
import Field from "./Field";
import Information from "./Information";
import styles from "./App.module.css";

function AppLayout({ children }) {
  return (
    <div className={styles["app"]}>
      <div className={styles["container"]}>{children}</div>
    </div>
  );
}

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);

  return (
    <AppLayout>
      <Information
        isDraw={isDraw}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        isGameEnded={isGameEnded}
        setIsGameEnded={setIsGameEnded}
        field={field}
      />
      <Field
        field={field}
        setField={setField}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setIsGameEnded={setIsGameEnded}
        isGameEnded={isGameEnded}
        setIsDraw={setIsDraw}
      />
    </AppLayout>
  );
}
