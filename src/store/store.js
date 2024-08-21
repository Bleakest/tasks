import { legacy_createStore, compose } from "redux";
import appReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(appReducer, composeEnhancers());
