import styles from "./app.module.css";
import data from "../data.json";
import { useState } from "react";

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === data.length - 1;

  function handleNext() {
    setActiveIndex(activeIndex + 1);
  }
  function handlePrev() {
    setActiveIndex(activeIndex - 1);
  }
  function handleBegin() {
    setActiveIndex(0);
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step, index) => {
              return (
                <li
                  key={step.id}
                  className={
                    styles["steps-item"] +
                    " " +
                    (activeIndex === index && styles.active) +
                    " " +
                    (activeIndex > index && styles.done)
                  }
                >
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={styles["steps-item-button"]}
                  >
                    {index + 1}
                  </button>
                  <p>{step.title}</p>
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={() => handlePrev()}
              className={styles.button}
              disabled={isFirstStep}
            >
              Назад
            </button>
            <button
              onClick={isLastStep ? handleBegin : handleNext}
              className={styles.button}
            >
              {isLastStep ? "Начать сначала" : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
