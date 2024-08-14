import {
  applyMiddleware,
  legacy_createStore,
  compose,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import { searchReducer, todoReducer } from "./reducers";

const reducers = combineReducers({
  todoState: todoReducer,
  searchState: searchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
