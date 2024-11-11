/* eslint-disable react/prop-types */
import { MedicalHistory } from "./medicalHistory";
import { useContext, useState } from "react";
import { Box, Button, Card, CardContent, Tab, Tabs } from "@mui/material";
import { dataBase } from "../../../dataBase/DataBase";
import { MedicalHistoryRecord } from "./MedicalHistoryRecord";
import { GeneralContext } from "../../../context/GeneralContext";
import { Link, useParams } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MedicalHistoryContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const { patientId } = useParams();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const patient = dataBase.find((patient) => patient.patientId == patientId);

  const historiaClinica = patient.historiaClinica;

  console.log(historiaClinica);

  // console.log(patientId);

  const props = {
    patient,
    handleGoBack,
    patientId,
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
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{}}
        >
          <Tab label="Editar" {...a11yProps(0)} />
          <Tab label="Historial" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <MedicalHistory {...props} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
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
          Historia Clínica: Historial
        </h2>
        {patient.historiaClinica.map((historia, index) => (
          <MedicalHistoryRecord
            key={index}
            fecha={historia.fechaConsulta}
            consulta={historia.consulta}
          />
        ))}
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
