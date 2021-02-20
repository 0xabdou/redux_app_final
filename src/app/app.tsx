import LoggedInPage from "../features/auth/ui/logged-in-page";
import LoginPage from "../features/auth/ui/login-page";
import {useSelector} from "react-redux";
import {AppState} from "./store";

const App = () => {
  const user = useSelector((state: AppState) => state.auth.currentUser);

  return user != null ? <LoggedInPage/> : <LoginPage/>;
};

export default App;
