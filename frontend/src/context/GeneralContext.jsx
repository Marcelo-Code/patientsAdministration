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

  //Función para ordenar registros

  const sortRecords = (records, setRecords, sortField, order, setSortFlag) => {
    let sortedRecords;
    if (typeof records[0][sortField] === "string") {
      sortedRecords = [...records].sort((a, b) =>
        order === "down"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField])
      );
    }
    order === "down" ? setSortFlag(true) : setSortFlag(false);
    setRecords(sortedRecords);
  };

  //Función para crear listas
  const createList = (
    records,
    name,
    value,
    includeAllOption,
    value2,
    value3,
    value4
  ) => {
    const uniqueFileds = new Set();
    const result = [];

    records.forEach((record) => {
      const fieldValue = record[name];
      const value2 = record[value];

      if (!uniqueFileds.has(fieldValue)) {
        uniqueFileds.add(fieldValue);
        result.push({
          id: record.id,
          name: fieldValue,
          value: value2,
          value2: record.value2 || null,
          value3: record.value3 || null,
          value4: record.value4 || null,
        });
      }
    });

    const sortedRecords = result.sort((a, b) => a.name.localeCompare(b.name));
    if (includeAllOption) {
      sortedRecords.unshift({
        id: -1,
        name: "Todos",
        value: "Todos",
      });
    }
    return sortedRecords;
  };

  const data = {
    goBackAction,
    isLoading,
    setIsLoading,
    cancelAction,
    handleGoBack,
    sortRecords,
    createList,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
