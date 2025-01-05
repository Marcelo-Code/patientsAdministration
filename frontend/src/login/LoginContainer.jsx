import { useContext, useState } from "react";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";

export const LoginContainer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateToken, setUpdateToken, isAuthenticated, probeToken } =
    useContext(TokenContext);

  const [showPassword, setShowPassword] = useState(false);

  const propsLogin = {
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    password,
    setPassword,
    navigate,
    isLoading,
    setIsLoading,
    updateToken,
    setUpdateToken,
    isAuthenticated,
    probeToken,
  };

  return <Login {...propsLogin} />;
};
