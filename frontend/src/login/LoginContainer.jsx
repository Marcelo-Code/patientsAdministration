import { useState } from "react";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const propsLogin = {
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    password,
    setPassword,
    navigate,
  };

  return <Login {...propsLogin} />;
};
