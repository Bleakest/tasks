import styles from "./app.module.css";
import { useState } from "react";

const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const App = () => {
  const [operand1, setOperand1] = useState("");
  const [operator, setOperator] = useState("");
  const [operand2, setOperand2] = useState("");
  const [total, setTotal] = useState("");
  const totalEL = document.querySelector(".total");

  function handleClear() {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setTotal("");
  }

  function handlePlus() {
    if (total) {
      setOperand1(total);
      setTotal("");
      setOperator("+");
    } else {
      setOperator("+");
    }
  }

  function handleMinus() {
    if (total) {
      setOperand1(total);
      setTotal("");
      setOperator("-");
    } else {
      setOperator("-");
    }
  }

  function handleEqual() {
    totalEL.style.color = "red";
    if (operator == "+") {
      setTotal(Number(operand1) + Number(operand2));
    } else if (operator == "-") {
      setTotal(Number(operand1) - Number(operand2));
    }

    setOperand1("");
    setOperand2("");
    setOperator("");
  }

  function handeNum(item) {
    if (total) {
      setOperand1(total + item);
      setTotal("");
      setOperator("");
    } else if (!operator) {
      setOperand1(operand1 + item);
    } else {
      setOperand2(operand2 + item);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles["counter"]}>
        {operand1 + " " + operator + " " + operand2}
        <div className="total">{total}</div>
      </div>
      <button onClick={() => handleClear()} className={styles["clear"]}>
        C
      </button>
      <ul className={styles["list"]}>
        {NUMS.map((item) => (
          <button
            onClick={() => handeNum(item)}
            className={styles["num"]}
            key={item}
          >
            {item}
          </button>
        ))}
      </ul>
      <div className={styles["btnBar"]}>
        <button onClick={() => handlePlus()} className={styles["btn"]}>
          +
        </button>
        <button onClick={() => handleMinus()} className={styles["btn"]}>
          -
        </button>
      </div>
      <div onClick={() => handleEqual()} className={styles["equal"]}>
        =
      </div>
    </div>
  );
};

export default App;
