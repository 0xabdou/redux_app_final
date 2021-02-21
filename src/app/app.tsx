import LoggedInPage from "../features/auth/ui/logged-in-page";
import LoginPage from "../features/auth/ui/login-page";
import {useAppSelector} from "./redux-hooks";


const App = () => {
  const user = useAppSelector(state => state.auth.currentUser);


  return user != null ? <LoggedInPage/> : <LoginPage/>;
};

export default App;
