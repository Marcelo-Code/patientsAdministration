import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext } from "../../../context/TokenContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(TokenContext); // Usar el contexto

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
