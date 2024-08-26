import React from "react";
import { ACTION_TYPES } from "../store/action-types";
import { connect } from "react-redux";
import CheckForWin from "../utils/CheckForWin";
import CheckForDraw from "../utils/CheckForDraw";

function FieldLayout({
  field,
  handleClick,
  handleReset,
  isGameEnded,
  currentPlayer,
}) {
  return (
    <div className="fieldContainer">
      {field.map((item, index) => {
        return (
          <div
            onClick={() =>
              handleClick(index, isGameEnded, field, currentPlayer)
            }
            className="field"
            key={index}
          >
            <div>{item}</div>
          </div>
        );
      })}
      <button
        onClick={() => handleReset()}
        className="border-[1px] rounded-lg border-black p-2 mt-2"
      >
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

  render() {
    return (
      <>
        <FieldLayout
          handleReset={this.handleReset}
          handleClick={this.handleClick}
          field={this.props.field}
          isGameEnded={this.props.isGameEnded}
          currentPlayer={this.props.currentPlayer}
        />
      </>
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

      CheckForWin();
      CheckForDraw();

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
