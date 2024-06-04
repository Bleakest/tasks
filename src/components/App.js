import styles from "./app.module.css";
import data from "../data.json";
import { useState } from "react";

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstStep = activeIndex ? false : true;
  const isLastStep = activeIndex == 6 ? true : false;

  function handleNext(event) {
    setActiveIndex(activeIndex + 1);
  }
  function handlePrev(event) {
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
            {steps.map((step) => {
              return (
                <li
                  key={step.id}
                  className={
                    activeIndex + 1 == step.id.slice(2)
                      ? styles["steps-item"] + " " + styles.active
                      : styles["steps-item"] &&
                        activeIndex + 1 > step.id.slice(2)
                      ? styles["steps-item"] + " " + styles.done
                      : styles["steps-item"]
                  }
                >
                  <button
                    onClick={(event) =>
                      setActiveIndex(Number(event.target.textContent) - 1)
                    }
                    className={styles["steps-item-button"]}
                  >
                    {step.id.slice(2)}
                  </button>
                  <p>{step.title}</p>
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={(event) => handlePrev(event)}
              className={styles.button}
              disabled={isFirstStep}
            >
              Назад
            </button>
            {isLastStep ? (
              <button
                onClick={(event) => handleBegin()}
                className={styles.button}
              >
                Начать сначала
              </button>
            ) : (
              <button
                onClick={(event) => handleNext(event)}
                className={styles.button}
              >
                Далее
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
