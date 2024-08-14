import { CHANGE_SEARCH } from "../types";

const initialState = { searchInput: "", inputValue: "", isSorted: false };

export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_SEARCH:
      return { ...state, searchInput: payload };

    default:
      return state;
  }
};
