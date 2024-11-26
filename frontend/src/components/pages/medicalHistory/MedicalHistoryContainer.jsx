/* eslint-disable react/prop-types */
import { MedicalHistory } from "./medicalHistory";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Menu, Tab, Tabs } from "@mui/material";
import { MedicalHistoryRecord } from "./MedicalHistoryRecord";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import {
  createMedicalRecord,
  getMedicalHistory,
} from "../../../api/medicalRecords";
import { getPatient } from "../../../api/patients";
import { Spinner } from "../../common/spinner/Spinner";
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import { ExportToWord } from "../../common/exportToWord/ExportToWord";
import { OptionsMenu } from "../../common/Menu/OptionsMenu";
import { DocxGenerator } from "../../common/exportToWord/docGenerator";
import { format } from "date-fns";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MedicalHistoryContainer = () => {
  const { patientId } = useParams();

  const { handleGoBack, cancelAction, goBackAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos de la nueva consulta

  const initialState = {
    idPaciente: patientId,
    idProfesional: null,
    fechaConsulta: null,
    tipoConsulta: null,
    descripcion: "",
  };
  const [medicalRecord, setMedicalRecord] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMedicalRecord = { ...medicalRecord, [name]: value };
    setMedicalRecord(updatedMedicalRecord);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para llamar a la función POST

  const handleSubmit = (e) => {
    console.log("creando consulta");
    setIsLoading(true);
    e.preventDefault();
    createMedicalRecord(medicalRecord)
      .then((response) => {
        console.log(response);
        setUpdateList(!updateList);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  //Hook para habilitar el modo edición

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

  //Hook para cambiar de pestaña

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //Hook para actualizar la lista con el flag updateList
  const [updateList, setUpdateList] = useState(false);

  //Hooks para setear registros en el useEffect:
  //* Pacientes
  //* Consultas
  const [records, setRecords] = useState(null);
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

    // console.log(event.target.checked);

    let updatedRecordsToReport;

    if (isChecked) {
      const record = records.find((item) => item.id === id);
      updatedRecordsToReport = [...recordsToReport, record];
    } else {
      updatedRecordsToReport = recordsToReport.filter((item) => item.id !== id);
    }

    const sortedRecords = updatedRecordsToReport.sort(
      (a, b) => new Date(a.fechaconsulta) - new Date(b.fechaconsulta)
    );

    console.log(sortedRecords);

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
    Promise.all([getMedicalHistory(patientId), getPatient(patientId)])
      .then(([responseMedicalHistory, responsePatient]) => {
        setRecords(responseMedicalHistory);
        setPatient(responsePatient);
      })
      .catch((error) => console.log(error));
  }, [patientId, updateList]);

  if (!records) return <Spinner />;

  // console.log(records);

  //Genera un array para filtrar los profesionales para el menú
  const professionals = Array.from(
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

  //Genera un array para filtrar los tipos de consulta para el menú
  const meetings = Array.from(
    new Set(records.map((record) => record.tipoconsulta))
  ).map((tipoConsulta, index) => ({
    id: index,
    name: tipoConsulta,
    value: tipoConsulta,
  }));

  const handleMenuChange = (e) => {
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
    console.log(reportTitle);
  };

  const meetingsProps = {
    handleChange: handleMenuChange,
    name: "tipoconsulta",
    array: meetings,
    initialValue:
      reportTitle.tipoconsulta === ""
        ? "Selecc. Reunión"
        : reportTitle.tipoconsulta,
    modified: false,
  };

  const professionalProps = {
    handleChange: handleMenuChange,
    name: "nombreyapellidoprofesional",
    array: professionals,
    initialValue:
      reportTitle.nombreyapellidoprofesional === ""
        ? "Selecc. Profesional"
        : reportTitle.nombreyapellidoprofesional,
    modified: false,
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

  const props = {
    patient,
    handleChange,
    handleSubmit,
    handleGoBack,
    cancelAction,
    goBackAction,
    isLoading,
    modifiedFlag,
  };

  const propsMedicalHistoryRecords = {
    records,
    patient,
    editMode,
    isChecked,
    handleCheckboxChange,
    updateList,
    setUpdateList,
    reportMode,
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "0px",
        position: "absolute",
        top: "80px",
      }}
    >
      {/* Contenedor de pestañas */}
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{}}
        >
          <Tab label="Historial" {...a11yProps(0)} />
          <Tab label="Nuevo Report" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "80%",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontFamily: "Arial",
              fontSize: "1.2em",
              color: "gray",
            }}
          >
            Edición
            <Android12Switch
              checked={editMode}
              onChange={handleEditModeChange}
              sx={{ transform: "scale(1.3)" }}
            />
          </div>
          <div
            style={{
              fontFamily: "Arial",
              fontSize: "1.2em",
              color: "gray",
            }}
          >
            Informe
            <Android12Switch
              checked={reportMode}
              onChange={handleReportModeChange}
              sx={{ transform: "scale(1.3)" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            width: "100%",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {reportMode && (
            <>
              <ExportToWord {...reportProps} />
              {/* <DocxGenerator /> */}
              <OptionsMenu {...professionalProps} />
              <OptionsMenu {...meetingsProps} />
            </>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <Button
            onClick={() => handleGoBack()}
            size="small"
            sx={{ width: "80%", minWidth: "300px" }}
          >
            Volver
          </Button>
        </div>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            margin: "10px",
            paddingBottom: "10px",
            borderBottom: "2px solid black",
          }}
        >
          Historial Terapéutico {patient.nombreyapellidopaciente}:
        </h2>
        {records.length == 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Aun no hay consultas para este paciente
          </h3>
        ) : (
          <MedicalHistoryRecord {...propsMedicalHistoryRecords} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MedicalHistory {...props} />
      </CustomTabPanel>
    </Box>
  );
};

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
