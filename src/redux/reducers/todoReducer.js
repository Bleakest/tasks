import { ADD_TODO, CHANGE_TODO, DELETE_TODO, INIT_TODO } from "../types";

const initialState = {
  todos: [],
};

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_TODO:
      return { ...state, todos: payload };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { ...payload }],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    case CHANGE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.map((item) => {
            if (item.id !== payload.id) {
              return item;
            } else {
              return payload;
            }
          }),
        ],
      };

    default:
      return state;
  }
};
