import React from "react";
import styles from "./Information.module.css";
import { useSelector } from "react-redux";

function InformationLayout({ result }) {
  return <div className={styles["container"]}>{result}</div>;
}

export default function Information() {
  const { isGameEnded, currentPlayer, isDraw } = useSelector((state) => state);
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
