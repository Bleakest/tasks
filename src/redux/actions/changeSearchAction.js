import { CHANGE_SEARCH } from "../types";

export const changeSearchAction = (text) => {
  return {
    type: CHANGE_SEARCH,
    payload: text,
  };
};
