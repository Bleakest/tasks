import { HANDLE_SEARCH } from "../types";

export const handleSearch = (arr) => {
  return {
    type: HANDLE_SEARCH,
    payload: arr,
  };
};
