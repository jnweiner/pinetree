import React from "react";

import LoginButton from "./LoginButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthButton;