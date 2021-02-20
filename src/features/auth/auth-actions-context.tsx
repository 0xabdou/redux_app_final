import React from "react";
import {authActions} from "./auth-slice";

export const AuthActionsContext = React.createContext(authActions);

const AuthActionsProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <AuthActionsContext.Provider value={authActions}>
      {children}
    </AuthActionsContext.Provider>
  );
};

export default AuthActionsProvider;