import React from "react";
import styles from "./Field.module.css";
import { ACTION_TYPES } from "../store/action-types";
import { connect } from "react-redux";
import { store } from "../store/store";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Варианты побед по горизонтали
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Варианты побед по вертикали
  [0, 4, 8],
  [2, 4, 6], // Варианты побед по диагонали
];

function FieldLayout({
  field,
  handleClick,
  handleReset,
  isGameEnded,
  currentPlayer,
}) {
  return (
    <div className={styles["fieldContainer"]}>
      {field.map((item, index) => {
        return (
          <div
            onClick={() =>
              handleClick(index, isGameEnded, field, currentPlayer)
            }
            className={styles["field"]}
            key={index}
          >
            <div>{item}</div>
          </div>
        );
      })}
      <button onClick={() => handleReset()} style={{ marginTop: "10px" }}>
        Начать заново
      </button>
    </div>
  );
}

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.handleReset = props.handleReset.bind(this);
    this.handleClick = props.handleClick.bind(this);
  }

  componentDidUpdate() {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      if (
        WIN_PATTERNS[i].every((el) => this.props.field[el] === "x") ||
        WIN_PATTERNS[i].every((el) => this.props.field[el] === "y")
      ) {
        store.dispatch({ type: ACTION_TYPES.SET_WIN });
        // store.dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
      } else if (
        this.props.isGameEnded === false &&
        !this.props.field.some((it) => it === "")
      ) {
        store.dispatch({ type: ACTION_TYPES.SET_DRAW });
      }
    }
  }

  render() {
    return (
      <div>
        <FieldLayout
          handleReset={this.handleReset}
          handleClick={this.handleClick}
          field={this.props.field}
          isGameEnded={this.props.isGameEnded}
          currentPlayer={this.props.currentPlayer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleReset: () => {
    dispatch({ type: ACTION_TYPES.RESET });
  },
  handleClick: (index, isGameEnded, field, currentPlayer) => {
    if (!isGameEnded) {
      let newArr = field.slice();
      newArr[index] = currentPlayer;
      dispatch({ type: ACTION_TYPES.SET_FIELD, payload: newArr });
      dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
    }
  },
});

const mapStateToProps = (state) => ({
  field: state.field,
  isGameEnded: state.isGameEnded,
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Field);
