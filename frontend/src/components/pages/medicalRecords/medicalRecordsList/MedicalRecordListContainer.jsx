import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../../common/spinner/Spinner";
import { MedicalRecordsList } from "./MedicalRecordsList";
import { GeneralContext } from "../../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { meetings } from "../../../common/Menu/meetings";
import { getMedicalRecords } from "../../../../api/medicalRecords";
import { getPatientRecord } from "../../../../api/patients";
import { Footer } from "../../../layout/footer/Footer";
import { NavBarContainer } from "../../../layout/navBar/NavBarContainer";

export const MedicalRecordListContainer = () => {
  const [patientFilter, setPatientFilter] = useState("Filtrar Paciente");
  const [professionalFilter, setProfessionalFilter] = useState(
    "Filtrar Profesional"
  );
  const [dateFilter, setDateFilter] = useState("Filtrar Fecha");
  const [resetKey, setResetKey] = useState(0);
  const [isResetEnabled, setIsResetEnabled] = useState(false);

  const { patientId = null } = useParams();

  const { sortRecords, createList, handleGoBack } = useContext(GeneralContext);
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
    e.type === "click" && setFilterMode(!filterMode);
    !editMode && resetFilters();
  };
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
    if (e.target.checked && reportMode) setReportMode(false);
  };

  //Hook para habilitar el modo informe

  const [reportMode, setReportMode] = useState(false);
  const handleReportModeChange = (e) => {
    setReportMode(e.target.checked);
    if (e.target.checked && editMode) setEditMode(false);
  };

  //Hooks para setear registros en el useEffect:
  //* Pacientes
  //* Consultas
  const [patient, setPatient] = useState(null);

  //Hook para seleccionar registros para el informe

  const [isChecked, setIsChecked] = useState({});
  const [recordsToReport, setRecordsToReport] = useState([]);
  const [reportTitle, setReportTitle] = useState({
    tipoconsulta: "",
    nombreyapellidoprofesional: "",
    matriculaprofesional: "",
    especialidadprofesional: "",
    periodoabordaje: "",
  });

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    setIsChecked((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));

    let updatedRecordsToReport;

    if (isChecked) {
      const record = records.find((item) => item.id === id);
      updatedRecordsToReport = [...recordsToReport, record];
    } else {
      updatedRecordsToReport = recordsToReport.filter((item) => item.id !== id);
    }

    //Ordena de menor a mayor las consultas por fecha

    const sortedRecords = updatedRecordsToReport.sort(
      (a, b) => new Date(a.fechaconsulta) - new Date(b.fechaconsulta)
    );

    //Muestro por consola las consultas ordenadas por fecha
    // console.log(sortedRecords);

    let periodoabordaje;

    if (sortedRecords.length > 1) {
      periodoabordaje = `${format(
        new Date(sortedRecords[0].fechaconsulta),
        "dd/MM/yyyy"
      )} - ${format(
        new Date(sortedRecords[sortedRecords.length - 1].fechaconsulta),
        "dd/MM/yyyy"
      )}`;
    } else if (sortedRecords.length === 1) {
      periodoabordaje = `${format(
        new Date(sortedRecords[0].fechaconsulta),
        "dd/MM/yyyy"
      )}`;
    } else if (sortedRecords.length === 0) {
      periodoabordaje = "";
    }

    setReportTitle({
      ...reportTitle,
      periodoabordaje,
    });

    setRecordsToReport(sortedRecords);
  };

  useEffect(() => {
    getMedicalRecords()
      .then((response) => {
        if (patientId) {
          const filteredRecords = response.filter(
            (record) => record.idpaciente === parseInt(patientId)
          );
          setRecords(filteredRecords);
          setListRecords(filteredRecords);
          getPatientRecord(patientId)
            .then((response) => setPatient(response))
            .catch((error) => console.log(error));
        } else {
          setRecords(response);
          setListRecords(response);
        }
      })
      .catch((error) => console.log(error));
  }, [updateFlag, patientId]);

  useEffect(() => {
    if (listRecords) {
      const newFilteredRecords = listRecords.filter((record) => {
        return Object.entries(filters).every(([filterName, filterValue]) => {
          return !filterValue || record[filterName] === filterValue;
        });
      });

      setRecords(newFilteredRecords);

      const patientsFilteredList = createList(
        newFilteredRecords,
        "nombreyapellidopaciente",
        "idpaciente",
        true
      );

      const professionalFilteredList = createList(
        newFilteredRecords,
        "nombreyapellidoprofesional",
        "idprofesional",
        true
      );

      console.log(newFilteredRecords);

      const dateFilteredList = createList(
        newFilteredRecords,
        "fechaconsulta",
        "fechaconsulta",
        true
      );

      const formattedFilteredDateList = dateFilteredList.map((date) => {
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

      setPatientsList(patientsFilteredList);
      setProfessionalList(professionalFilteredList);
      setDateList(formattedFilteredDateList);
    }
  }, [createList, filters, listRecords]);

  useEffect(() => {
    // Habilita el botón si hay algún filtro aplicado
    const hasFilters = Object.values(filters).some((value) => value !== null);
    console.log(filters);
    setIsResetEnabled(hasFilters);
  }, [filters]);

  if (!records || !patientsList || !professionalList || !dateList)
    return <Spinner />;

  //Lista de profesionales para el menu del informe
  const professionalsReportList = Array.from(
    new Set(records.map((record) => record.idprofesional))
  ).map((idprofesional) => {
    const record = records.find(
      (record) => record.idprofesional === idprofesional
    );
    return {
      id: idprofesional,
      name: record.nombreyapellidoprofesional,
      value: record.nombreyapellidoprofesional,
      value2: record.matriculaprofesional,
      value3: record.cuitprofesional,
      value4: record.especialidadprofesional,
    };
  });

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

  const handleReportMenuChange = (e) => {
    const { name, value } = e.target;

    const updatedReportTitle = {
      ...reportTitle,
      [name]: value,
    };

    if (e.target.value2)
      updatedReportTitle.matriculaprofesional = e.target.value2;
    if (e.target.value3) updatedReportTitle.cuitprofesional = e.target.value3;
    if (e.target.value4)
      updatedReportTitle.especialidadprofesional = e.target.value4;
    setReportTitle(updatedReportTitle);
  };

  // console.log(professionalList);

  const patientsFilterProps = {
    handleChange: handleMenuChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: patientFilter,
    key: `patient-filter-${resetKey}`, // Nueva clave
  };

  const professionalFilterProps = {
    handleChange: handleMenuChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: professionalFilter,
    key: `professional-filter-${resetKey}`, // Nueva clave
  };

  const datesFilterProps = {
    handleChange: handleMenuChange,
    name: "fechaconsulta",
    array: dateList,
    initialValue: dateFilter,
    key: `date-filter-${resetKey}`,
  };

  const reportProps = {
    records: recordsToReport,
    patient,
    reportTitle,
    enableReportButton:
      recordsToReport.length > 0 &&
      reportTitle.nombreyapellidoprofesional !== "" &&
      reportTitle.tipoconsulta !== ""
        ? true
        : false,
  };

  // console.log(reportTitle);

  const meetingsReportProps = {
    handleChange: handleReportMenuChange,
    name: "tipoconsulta",
    array: meetings,
    initialValue:
      reportTitle.tipoconsulta === ""
        ? "Selecc. Reunión"
        : reportTitle.tipoconsulta,
    modified: false,
  };

  const professionalsReportProps = {
    handleChange: handleReportMenuChange,
    name: "nombreyapellidoprofesional",
    array: professionalsReportList,
    initialValue:
      reportTitle.nombreyapellidoprofesional === ""
        ? "Selecc. Profesional"
        : reportTitle.nombreyapellidoprofesional,
    modified: false,
  };

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
    patientsFilterProps,
    professionalFilterProps,
    datesFilterProps,
    resetFilters,
    isResetEnabled,
    updateFlag,
    setUpdateFlag,
    handleGoBack,
    handleReportModeChange,
    reportMode,
    reportProps,
    meetingsReportProps,
    professionalsReportProps,
    isChecked,
    handleCheckboxChange,
    patientId,
  };

  return (
    <>
      <NavBarContainer />
      <MedicalRecordsList {...props} />;
      <Footer />
    </>
  );
};
