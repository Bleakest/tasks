import {
  ADD_TODO,
  CHANGE_TODO,
  DELETE_TODO,
  HANDLE_SEARCH,
  INIT_TODO,
  SORT_TODOS,
} from "../types";

const initialState = {
  todos: [],
  refreshTodos: false,
};

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_TODO:
      return { ...state, todos: payload };

    case ADD_TODO:
      return { ...state, inputValue: "" };

    case DELETE_TODO:
      return { ...state };
    case CHANGE_TODO:
      return { ...state, inputValue: payload };

    case SORT_TODOS:
      return {
        ...state,
        isSorted: state.isSorted ? false : true,
      };
    case HANDLE_SEARCH:
      return { ...state, todos: payload };

    default:
      return state;
  }
};
