import {combineReducers} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {StoreExtraArg} from "./dependencies";
import authReducer from "../features/auth/auth-slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const createStore = (extraArg: StoreExtraArg) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: extraArg},
    }),
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof rootReducer>;

export default createStore;