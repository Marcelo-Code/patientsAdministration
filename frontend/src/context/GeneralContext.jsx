/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const handleGoBack = () => {
    navigate(-1);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const cancelAction = () => {
    Swal.fire({
      title: "¿Seguro que querés descartar cambios?",
      text: "Se van a perder las modificaciones",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        reloadPage();
      }
    });
  };

  const goBackAction = (modifiedFlag = false) => {
    modifiedFlag
      ? Swal.fire({
          title: "¿Seguro que querés volver?",
          text: "Se van a perder las modificaciones",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Confirmar",
        }).then((result) => {
          if (result.isConfirmed) {
            handleGoBack();
          }
        })
      : handleGoBack();
  };

  const data = {
    goBackAction,
    isLoading,
    setIsLoading,
    cancelAction,
    handleGoBack,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
