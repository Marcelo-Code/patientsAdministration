/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [updateToken, setUpdateToken] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // Tiempo restante en segundos
  const [startTimer, setStartTimer] = useState(null);

  //Registro donde se guardan los datos del usuario
  const [userRolRecord, setUserRolRecord] = useState(null);

  // Log para verificar cambios en el token

  const probeToken = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return false;

    try {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      const timeToExpire = decodedToken.exp - currentTime;
      if (timeToExpire <= 0) {
        console.log("Token expirado, cerrando sesión...");
        localStorage.removeItem("token");
        setToken(null);
        return false;
      } else {
        console.log("Token válido. Expira en:", timeToExpire, "segundos");
        setToken(storedToken);
        setTimeRemaining(Math.floor(timeToExpire));
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        setStartTimer(!startTimer);
        return true;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("token");
      return false;
    }
  };

  //Activa el temporizador para finalizar la sesión

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTimer, timeRemaining]);

  //Una vez que el temporizador llega a 0 desloguea, con setIsAuthenticated(false)

  useEffect(() => {
    if (timeRemaining > 0) return;
    if (isAuthenticated) {
      console.log("Token expirado automáticamente.");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      setToken(null);
      setIsAuthenticated(false);
    }
  }, [timeRemaining, isAuthenticated]);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        updateToken,
        setUpdateToken,
        probeToken,
        userRolRecord,
        setUserRolRecord,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
