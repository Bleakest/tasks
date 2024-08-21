import React from "react";
import styles from "./Information.module.css";
import { store } from "../store/store";

function InformationLayout({ result }) {
  return <div className={styles["container"]}>{result}</div>;
}

export default function Information() {
  const { isGameEnded, currentPlayer, isDraw } = store.getState();
  const res = isDraw
    ? "ничья"
    : isGameEnded
    ? `победил ${currentPlayer}`
    : `ходит ${currentPlayer}`;

  return (
    <div>
      <InformationLayout result={res} />
    </div>
  );
}
