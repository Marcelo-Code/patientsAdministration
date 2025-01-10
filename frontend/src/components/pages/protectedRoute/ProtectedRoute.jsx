import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../../common/spinner/Spinner";

export const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth =
      JSON.parse(localStorage.getItem("isAuthenticated")) || false;
    setIsAuthenticated(storedAuth);
    setIsLoading(false);
  }, []);

  if (isLoading) return <Spinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
