import LoggedInPage from "../features/auth/ui/logged-in-page";
import LoginPage from "../features/auth/ui/login-page";

const App = () => {
  const user = null;

  return user != null ? <LoggedInPage/> : <LoginPage/>;
};

export default App;
