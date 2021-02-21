import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {MuiThemeProvider} from "@material-ui/core";
import theme from "./styles/theme";
import {Provider} from "react-redux";
import AuthActionsProvider from "./features/auth/auth-actions-context";
import {store} from "./app/dependencies";

ReactDOM.render(
  <Provider store={store}>
    <AuthActionsProvider>
      <MuiThemeProvider theme={theme}>
        <App/>
      </MuiThemeProvider>
    </AuthActionsProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
