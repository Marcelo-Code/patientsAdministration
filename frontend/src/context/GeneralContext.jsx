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

  const [darkMode, setDarkMode] = useState(false);

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const [updateAlertsList, setUpdateAlertsList] = useState(false);

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

  const cancelTableAction = () => {
    return Swal.fire({
      title: "¿Seguro que querés descartar cambios?",
      text: "Se van a perder las modificaciones",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => result.isConfirmed);
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
    records, //nombre del array
    name, //nombre de la variable
    value, //valor de la variable
    includeAllOption, //true o false para incluir todo
    value2, //valor 2 de la variable
    value3, //valor 3 de la variable
    value4 //valor 4 de la variable
  ) => {
    const uniqueFileds = new Set();
    const result = [];

    records.forEach((record) => {
      const fieldValue =
        record[name] !== undefined && record[name] !== null ? record[name] : "";
      const recordValue =
        record[value] !== undefined && record[value] !== null
          ? record[value]
          : "";
      const recordValue2 =
        record[value2] !== undefined && record[value2] !== null
          ? record[value2]
          : null;
      const recordValue3 =
        record[value3] !== undefined && record[value3] !== null
          ? record[value3]
          : null;
      const recordValue4 =
        record[value4] !== undefined && record[value4] !== null
          ? record[value4]
          : null;

      if (!uniqueFileds.has(fieldValue)) {
        uniqueFileds.add(fieldValue);
        result.push({
          id: record.id,
          name: fieldValue,
          value: recordValue,
          value2: recordValue2 || null,
          value3: recordValue3 || null,
          value4: recordValue4 || null,
        });
      }
    });

    const sortedRecords = result.sort((a, b) => {
      const nameA = a.name || ""; // Asegura que siempre sea una cadena
      const nameB = b.name || "";

      // Solo usar localeCompare si ambos son cadenas
      if (typeof nameA === "string" && typeof nameB === "string") {
        return nameA.localeCompare(nameB, "es", { sensitivity: "base" });
      }

      // Si no son cadenas, no ordenar (puedes ajustarlo según tus necesidades)
      return 0;
    });

    if (includeAllOption) {
      sortedRecords.unshift({
        id: -1,
        name: "Todos",
        value: "Todos",
      });
    }
    return sortedRecords;
  };

  const trimUrl = (url) => {
    if (url && typeof url === "string") {
      // Obtener todo después de la última barra diagonal
      const lastSlashIndex = url.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        return url.slice(lastSlashIndex + 1); // Recorta todo lo que está después de la última barra
      }
      return url; // Si no hay barra diagonal, devolvemos la URL original
    }
    return "";
  };

  //Función para aplicar fomato al período facturado
  //------------------------------------------------

  const formatPeriod = (datePeriod) => {
    const date = new Date(datePeriod);
    // Crear el formateador para el mes y el año
    const formatter = new Intl.DateTimeFormat("es-AR", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

    // Formatear la fecha
    const formattedDate = formatter.format(date);

    // Capitalizar el mes
    const formattedDateCapitalized =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return formattedDateCapitalized;
  };

  //Función para quitar caracteres especiales de un string
  //------------------------------------------------------

  const removeAccentsAndSpecialChars = (str) => {
    const normalizedStr = str.normalize("NFD");
    const cleanedStr = normalizedStr
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "");
    return cleanedStr;
  };

  const data = {
    goBackAction,
    isLoading,
    setIsLoading,
    cancelAction,
    handleGoBack,
    sortRecords,
    createList,
    cancelTableAction,
    trimUrl,
    formatPeriod,
    removeAccentsAndSpecialChars,
    darkMode,
    setDarkMode,
    pageIsLoading,
    setPageIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
