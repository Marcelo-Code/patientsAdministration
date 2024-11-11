/* eslint-disable react/prop-types */
import { Button, TextareaAutosize } from "@mui/material";
import "./medicalHistory.css";
import { Link } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const MedicalHistory = (props) => {
  const { handleGoBack, patient } = props;
  return (
    <div className="medicalHistory">
      <span
        style={{
          width: "80%",
          minWidth: "280px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          borderBottom: "2px solid black",
          marginBottom: "10px",
          paddingBottom: "10px",
          alignItems: "center",
        }}
      >
        <h2>Historia Clínica: Report</h2>
        <h2>
          {patient.nombre} {patient.apellido}
        </h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Fecha de Consulta" />
        </LocalizationProvider>
      </span>
      <TextareaAutosize
        style={{
          maxWidth: "80%",
          width: "80%",
          minWidth: "280px",
          height: "100px",
        }}
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
      />
      <div className="buttonMedicalHistory">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
          }}
        >
          <Link style={{}}>
            <Button
              size="small"
              sx={{ width: "280px" }}
              variant="contained"
              startIcon={<UploadIcon />}
            >
              Subir Documentación
            </Button>
          </Link>
          <Link style={{}}>
            <Button
              size="small"
              sx={{ width: "280px" }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Link>
        </div>
        <Button
          onClick={handleGoBack}
          size="small"
          sx={{
            marginTop: "10px",
            height: "2.5em",
            width: "100%",
          }}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
