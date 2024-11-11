/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

import "./createPatient.css";
import { useState } from "react";

export const CreatePatient = ({
  handleGoBack,
  handleChange,
  selectedValue,
}) => {
  const [result, setResult] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        position: "absolute",
        top: "90px",
      }}
    >
      <FormGroup>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            margin: "10px",
            paddingBottom: "10px",
            borderBottom: "2px solid black",
          }}
        >
          Generar nuevo paciente
        </h2>
        <Box
          sx={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "1fr 1fr",
            "@media (max-width: 800px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMembershipIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Nro Afiliado"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImportContactsIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="DNI"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HouseIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Dirección"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsAppIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Teléfono Responsable"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocationCityIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Ciudad"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "right",
                maxWidth: "100%",
              }}
            >
              <PersonIcon sx={{ marginRight: "0px" }} />
              <span
                style={{
                  marginLeft: "0px",
                  padding: "0px",
                  textAlign: "right",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              ></span>
            </span>
            <TextField
              style={{
                margin: "10px 10px 10px 5px",
                padding: "0px",
                minWidth: "200px",
                width: "200px",
              }}
              id="outlined-basic"
              label="Responsable Paciente"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Escuela"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Dirección Escuela"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsAppIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Teléfono Escuela"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Dirección Escuela"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Año/Grado/Sala"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Docente Referente"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Directivo Escuela"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Escuela Especial"
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Ref. Escuela Esp."
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsAppIcon />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Tel. Ref. Escuela Esp."
              variant="outlined"
            />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMembershipIcon />
            <span style={{}}>CUD</span>
            <RadioGroup
              row
              sx={{ margin: "10px 0px 10px 40px", width: "200px" }}
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Sí" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CalendarIcon />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "200px", margin: "10px" }}
                label="Fecha vto. CUD"
              />
            </LocalizationProvider>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CalendarIcon />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "200px", margin: "10px" }}
                label="Fecha inicio"
              />
            </LocalizationProvider>
          </span>
        </Box>
        <div className="buttonGroup">
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
                startIcon={<CancelIcon />}
              >
                Cancelar
              </Button>
            </Link>
            <Link style={{}}>
              <Button
                onClick={async () => {
                  const res = await fetch(`${URL}/ping`);
                  const data = await res.json();
                  console.log(data);
                  setResult(data);
                }}
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
      </FormGroup>
    </div>
  );
};
