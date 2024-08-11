import { ACTION_TYPES } from "./action-types";

const initialState = {
  currentPlayer: "x",
  isGameEnded: false,
  isDraw: false,
  field: ["", "", "", "", "", "", "", "", ""],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.RESET:
      return { ...initialState };
    case ACTION_TYPES.SET_WIN:
      return { ...state, isGameEnded: true };
    case ACTION_TYPES.SET_DRAW:
      return { ...state, isDraw: true };
    case ACTION_TYPES.TOGGLE_PLAYER:
      return {
        ...state,
        currentPlayer: state.currentPlayer === "x" ? "y" : "x",
      };
    case ACTION_TYPES.SET_FIELD:
      return {
        ...state,
        field: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
