import { applyMiddleware, legacy_createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import { todoReducer } from "./reducers/todoReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  todoReducer,
  composeEnhancers(applyMiddleware(thunk))
);
