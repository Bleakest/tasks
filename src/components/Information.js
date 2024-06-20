import React, { useState } from "react";
import styles from "./Information.module.css";
import PropTypes from "prop-types";

function InformationLayout({ result }) {
  return <div className={styles["container"]}>{result}</div>;
}

export default function Information({ isDraw, isGameEnded, currentPlayer }) {
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

Information.propTypes = {
  isDraw: PropTypes.bool,
  isGameEnded: PropTypes.bool,
  currentPlayer: PropTypes.string,
};
