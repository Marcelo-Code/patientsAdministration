/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormGroup,
  TextField,
} from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
dayjs.locale("es");

export const EditProfessional = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };
  const {
    nombreyapellidoprofesional,
    especialidadprofesional,
    matriculaprofesional,
    cuitprofesional,
    dniprofesional,
    direccionprofesional,
    ciudadprofesional,
    telefonoprofesional,
    emailprofesional,
    fechavencimientornpprofesional,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
  } = props;

  return (
    <div
      style={{
        marginTop: "30px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormGroup
        sx={{
          minWidth: "320px",
          width: "60%",
          color: "text.secondary",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            "@media (max-width: 900px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* Nombre y Apellido Profesional */}

          <span style={style}>
            <PersonIcon
              sx={{
                color: modified.nombreyapellidoprofesional ? "red" : "",
              }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Nombre y Apellido"
              variant="outlined"
              name="nombreyapellidoprofesional"
              onChange={handleChange}
              value={nombreyapellidoprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Especialidad Profesional */}

          <span style={style}>
            <MedicationIcon
              sx={{ color: modified.especialidadprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Especialidad"
              variant="outlined"
              name="especialidadprofesional"
              onChange={handleChange}
              value={especialidadprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Matrícula Profesional */}

          <span style={style}>
            <CardMembershipIcon
              sx={{ color: modified.matriculaprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Matrícula"
              variant="outlined"
              name="matriculaprofesional"
              onChange={handleChange}
              value={matriculaprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* CUIT Profesional */}

          <span style={style}>
            <CardMembershipIcon
              sx={{ color: modified.cuitprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="CUIT"
              variant="outlined"
              name="cuitprofesional"
              onChange={handleChange}
              value={cuitprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* DNI Profesional */}

          <span style={style}>
            <ImportContactsIcon
              sx={{ color: modified.dniprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="DNI"
              variant="outlined"
              name="dniprofesional"
              onChange={handleChange}
              value={dniprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Dirección Profesional */}

          <span style={style}>
            <HouseIcon
              sx={{ color: modified.direccionprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Direción"
              variant="outlined"
              name="direccionprofesional"
              onChange={handleChange}
              value={direccionprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Ciudad Profesional */}

          <span style={style}>
            <LocationCityIcon
              sx={{ color: modified.ciudadprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Ciudad"
              variant="outlined"
              name="ciudadprofesional"
              onChange={handleChange}
              value={ciudadprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Teléfono Profesional */}

          <span style={style}>
            <PhoneInTalkIcon
              sx={{ color: modified.telefonoprofesional ? "red" : "" }}
            />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="Teléfono"
              variant="outlined"
              name="telefonoprofesional"
              onChange={handleChange}
              value={telefonoprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Email Profesional */}

          <span style={style}>
            <MailIcon sx={{ color: modified.emailprofesional ? "red" : "" }} />
            <TextField
              sx={{ margin: "10px", width: "200px", backgroundColor: "white" }}
              id="outlined-basic"
              label="e-mail"
              variant="outlined"
              name="emailprofesional"
              onChange={handleChange}
              value={emailprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Fecha Vencimiento RNP */}

          <span style={style}>
            <CalendarMonthIcon
              sx={{
                color: modified.fechavencimientornpprofesional ? "red" : "",
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                type="date"
                sx={{
                  width: "200px",
                  margin: "10px",
                  backgroundColor: "white",
                }}
                label="Fecha Venc RNP"
                name="fechavencimientornpprofesional"
                value={dayjs(fechavencimientornpprofesional)}
                format="DD/MM/YYYY"
                onChange={(newDate) => {
                  handleChange({
                    target: {
                      name: "fechavencimientornpprofesional",
                      value: dayjs(newDate).format("YYYY-MM-DD"),
                    },
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                slotProps={{
                  input: {
                    "aria-hidden": false,
                  },
                }}
              />
            </LocalizationProvider>
          </span>
        </Box>

        {/* Buttons */}

        <CardActions
          sx={{
            justifyContent: "center",
            width: "100%",
            gap: "10px",
            "@media (max-width: 800px)": {
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
        >
          <Link
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Button
              disabled={!modifiedFlag ? true : false}
              onClick={() => {
                cancelAction();
              }}
              size="small"
              sx={{ width: "100%" }}
              variant="contained"
              startIcon={<CancelIcon />}
            >
              Descartar Cambios
            </Button>
          </Link>
          <Link
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit}
              size="small"
              sx={{ width: "100%" }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </Link>
        </CardActions>
        <CardActions>
          <Button
            onClick={() => goBackAction(modifiedFlag)}
            size="small"
            sx={{ height: "2.5em", width: "100%", margin: "auto" }}
          >
            Volver
          </Button>
        </CardActions>
      </FormGroup>
    </div>
  );
};
