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
import MedicationIcon from "@mui/icons-material/Medication";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

import "./createPatient.css";
import dayjs from "dayjs";

export const CreatePatient = ({
  handleChange,
  handleSubmit,
  isLoading,
  cud,
  modifiedFlag,
  cancelAction,
  goBackAction,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        position: "relative",
        top: "90px",
      }}
    >
      <form>
        <FormGroup>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              margin: "80px 0px 10px 0px",
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
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre y Apellido Paciente"
                variant="outlined"
                name="nombreYApellidoPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Obra Social"
                variant="outlined"
                name="obraSocialPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nro Afiliado"
                variant="outlined"
                name="nroAfiliadoPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <ImportContactsIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                name="dniPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{ width: "200px", margin: "10px" }}
                  label="Fecha Nacimiento"
                  name="fechaNacimientoPaciente"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechaNacimientoPaciente",
                        value: dayjs(newDate).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </LocalizationProvider>
            </span>
            <span style={style}>
              <MedicationIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Diagnóstico Previo"
                variant="outlined"
                name="diagnosticoPrevio"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <HouseIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <LocationCityIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadPaciente"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre y Apellido Responsable"
                variant="outlined"
                name="nombreYApellidoResponsable"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <WhatsAppIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Teléfono Responsable"
                variant="outlined"
                name="telefonoResponsable"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <SchoolIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Escuela"
                variant="outlined"
                name="escuela"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <SchoolIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Dirección Escuela"
                variant="outlined"
                name="direccionEscuela"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <WhatsAppIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Teléfono Escuela"
                variant="outlined"
                name="telefonoEscuela"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <SchoolIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Año/Grado/Sala"
                variant="outlined"
                name="anioGradoSala"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre Docente Referente"
                variant="outlined"
                name="nombreYApellidoDocenteReferenteEscuela"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre Directivo Escuela"
                variant="outlined"
                name="nombreYApellidoDirectivoEscuela"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <SchoolIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Escuela Especial"
                variant="outlined"
                name="escuelaEspecial"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre Docente Ref. Esc. Esp."
                variant="outlined"
                name="nombreYApellidoDocenteReferenteEscuelaEspecial"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <WhatsAppIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Tel. Ref. Escuela Esp."
                variant="outlined"
                name="telefonoDocenteReferenteEscuelaEspecial"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <span>CUD</span>
              <RadioGroup
                row
                sx={{ margin: "10px", width: "200px" }}
                value={cud ? "yes" : "no"}
                name="CUD"
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "CUD",
                      value: value,
                    },
                  });
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{ width: "200px", margin: "10px" }}
                  label="Fecha vto. CUD"
                  name="fechaVencimientoCud"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechaVencimientoCud",
                        value: dayjs(newDate).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </LocalizationProvider>
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{ width: "200px", margin: "10px" }}
                  label="Fecha inicio Tto."
                  name="fechaInicioTto"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechaInicioTto",
                        value: dayjs(newDate).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  disabled={!modifiedFlag ? true : false}
                  onClick={() => {
                    cancelAction();
                  }}
                  size="small"
                  sx={{ width: "280px" }}
                  variant="contained"
                  startIcon={<CancelIcon />}
                >
                  Descartar Cambios
                </Button>
              </Link>
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                size="small"
                sx={{ width: "280px" }}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>
            </div>
            <Button
              onClick={() => goBackAction(modifiedFlag)}
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
      </form>
    </div>
  );
};
