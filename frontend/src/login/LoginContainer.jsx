import { useState } from "react";
import { Login } from "./Login";

export const LoginContainer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const propsLogin = {
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    password,
    setPassword,
    handleLogin,
  };

  return <Login {...propsLogin} />;
};
