import LoggedInPage from "./features/auth/ui/logged-in-page";
import {MuiThemeProvider} from "@material-ui/core";
import LoginPage from "./features/auth/ui/login-page";
import theme from "./styles/theme";

function App() {
  const loggedIn = false;

  return (
    <MuiThemeProvider theme={theme}>
      {loggedIn && <LoggedInPage/>}
      {!loggedIn && <LoginPage/>}
    </MuiThemeProvider>
  );
}


export default App;
