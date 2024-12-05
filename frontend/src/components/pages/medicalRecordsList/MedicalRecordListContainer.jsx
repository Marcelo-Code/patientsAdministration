import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../common/spinner/Spinner";
import { getMedicalRecords } from "../../../api/medicalRecords";
import { MedicalRecordsList } from "./MedicalRecordsList";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPatients } from "../../../api/patients";
import { getProfessionals } from "../../../api/professionals";

export const MedicalRecordListContainer = () => {
  const [patientFilter, setPatientFilter] = useState("Filtrar Paciente");
  const [professionalFilter, setProfessionalFilter] = useState(
    "Filtrar Profesional"
  );
  const [dateFilter, setDateFilter] = useState("Filtrar Fecha");
  const [resetKey, setResetKey] = useState(0);
  const [isResetEnabled, setIsResetEnabled] = useState(false);

  const { sortRecords, createList } = useContext(GeneralContext);
  const [records, setRecords] = useState(null);
  const [listRecords, setListRecords] = useState(null);
  const [filters, setFilters] = useState({});
  const [patientsList, setPatientsList] = useState(null);
  const [professionalList, setProfessionalList] = useState(null);
  const [dateList, setDateList] = useState(null);
  const [sortUpDateMode, setSortUpDateMode] = useState(false);
  const [sortUpPatientNameMode, setSortUpPatientNameMode] = useState(false);
  const [sortUpProfessionalNameMode, setSortUpProfessionalNameMode] =
    useState(false);
  const [filterMode, setFilterMode] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const handleFilterModeChange = (e) => {
    setFilterMode(e.target.checked);
    !editMode && resetFilters();
  };
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getMedicalRecords()
      .then((responseMedicalRecords) => {
        setRecords(responseMedicalRecords);
        setListRecords(responseMedicalRecords);
      })
      .catch((error) => console.log(error));
  }, [updateFlag]);

  useEffect(() => {
    if (listRecords) {
      const newFilteredRecords = listRecords.filter((record) => {
        return Object.entries(filters).every(([filterName, filterValue]) => {
          return !filterValue || record[filterName] === filterValue;
        });
      });

      setRecords(newFilteredRecords);

      // console.log(newFilteredRecords);

      const patientsList = createList(
        newFilteredRecords,
        "nombreyapellidopaciente",
        "idpaciente",
        true
      );
      const professionalList = createList(
        newFilteredRecords,
        "nombreyapellidoprofesional",
        "idprofesional",
        true
      );

      const dateList = createList(
        newFilteredRecords,
        "fechaconsulta",
        "fechaconsulta",
        true
      );

      const formattedDateList = dateList.map((date) => {
        const formattedName =
          date.name !== "Todos"
            ? new Date(date.name).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : date.name;

        return {
          ...date,
          name: formattedName,
          value: date.name,
        };
      });

      setPatientsList(patientsList);
      setProfessionalList(professionalList);
      setDateList(formattedDateList);
    }
  }, [createList, filters, listRecords]);

  console.log(patientsList);

  useEffect(() => {
    // Habilita el botón si hay algún filtro aplicado
    const hasFilters = Object.values(filters).some((value) => value !== null);
    console.log(filters);
    setIsResetEnabled(hasFilters);
  }, [filters]);

  if (!records || !patientsList || !professionalList || !dateList)
    return <Spinner />;

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    const newFilters = {
      ...filters,
      [name]: value === "Todos" ? null : value,
    };

    setFilters(newFilters);
    if (name === "idpaciente") setPatientFilter(value);
    if (name === "idprofesional") setProfessionalFilter(value);
    if (name === "fechaconsulta") setDateFilter(value);
  };

  const resetFilters = () => {
    setFilters({});
    setRecords(listRecords);
    setPatientFilter("Filtrar Paciente");
    setProfessionalFilter("Filtrar Profesional");
    setDateFilter("Filtrar Fecha");
    setResetKey((prevKey) => prevKey + 1);
  };

  const patientsProps = {
    handleChange: handleMenuChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: patientFilter,
    key: `patient-filter-${resetKey}`, // Nueva clave
  };

  const professionalProps = {
    handleChange: handleMenuChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: professionalFilter,
    key: `professional-filter-${resetKey}`, // Nueva clave
  };

  const datesProps = {
    handleChange: handleMenuChange,
    name: "fechaconsulta",
    array: dateList,
    initialValue: dateFilter,
    key: `date-filter-${resetKey}`, // Nueva clave
  };

  // console.log(dateList);
  // console.log(professionalList);

  const props = {
    records,
    setRecords,
    sortUpDateMode,
    sortUpPatientNameMode,
    sortUpProfessionalNameMode,
    sortRecords,
    setSortUpProfessionalNameMode,
    setSortUpPatientNameMode,
    setSortUpDateMode,
    filterMode,
    handleFilterModeChange,
    editMode,
    handleEditModeChange,
    patientsProps,
    professionalProps,
    datesProps,
    resetFilters,
    isResetEnabled,
    updateFlag,
    setUpdateFlag,
  };

  return <MedicalRecordsList {...props} />;
};
