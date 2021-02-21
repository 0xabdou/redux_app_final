import {combineReducers} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {StoreExtraArg} from "./dependencies";
import authReducer from "../features/auth/auth-slice";


const rootReducer = combineReducers({
  auth: authReducer,
});

// Add a parameter of type StoreExtraArg
const createStore = (extraArg: StoreExtraArg) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      // Pass that parameter as a thunk extra argument
      thunk: {extraArgument: extraArg},
    }),
  });
};

export default createStore;

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];