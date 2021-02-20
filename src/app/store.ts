import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // Add reducers
});

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof rootReducer>;

export default createStore;