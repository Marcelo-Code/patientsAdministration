/* eslint-disable react/prop-types */
import { MedicalHistory } from "./medicalHistory";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { MedicalHistoryRecord } from "./MedicalHistoryRecord";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import {
  createMedicalRecord,
  getMedicalHistory,
} from "../../../api/medicalRecords";
import { getPatient } from "../../../api/patients";
import { Spinner } from "../../common/spinner/Spinner";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MedicalHistoryContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(false);
  const { patientId } = useParams();
  const [records, setRecords] = useState(null);
  const [patient, setPatient] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState({
    idPaciente: patientId,
    idProfesional: null,
    fechaConsulta: null,
    tipoConsulta: null,
    descripcion: "",
  });

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMedicalRecord = { ...medicalRecord, [name]: value };
    setMedicalRecord(updatedMedicalRecord);
    console.log(medicalRecord);
  };

  const handleSubmit = () => {
    createMedicalRecord(medicalRecord)
      .then((response) => {
        console.log(response), setUpdateList(!updateList);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getMedicalHistory(patientId), getPatient(patientId)])
      .then(([responseMedicalHistory, responsePatient]) => {
        setRecords(responseMedicalHistory);
        setPatient(responsePatient);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [patientId, updateList]);

  if (!records) return <Spinner />;

  const props = {
    patient,
    handleGoBack,
    handleChange,
    handleSubmit,
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
          }}
        >
          <Button
            size="small"
            sx={{ minWidth: "300px" }}
            variant="contained"
            startIcon={<ArticleIcon />}
          >
            Generar Informe
          </Button>
          <Button
            onClick={handleGoBack}
            size="small"
            sx={{ minWidth: "300px" }}
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
          records.map((historia) => (
            <MedicalHistoryRecord
              key={historia.id}
              id={historia.id}
              fecha={historia.fechaconsulta}
              tipo={historia.tipoconsulta}
              descripcion={historia.descripcion}
              profesional={historia.nombreyapellidoprofesional}
              updateList={updateList}
              setUpdateList={setUpdateList}
            />
          ))
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
