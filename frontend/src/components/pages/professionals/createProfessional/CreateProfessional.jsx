/* eslint-disable react/prop-types */
import { Box, Button, FormGroup, TextField } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MedicationIcon from "@mui/icons-material/Medication";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MailIcon from "@mui/icons-material/Mail";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";

import "./createProfessional.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CreateProfessional = ({
  handleChange,
  handleSubmit,
  isLoading,
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
        top: 0,
      }}
    >
      <form>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            margin: "80px 0px 10px 0px",
            paddingBottom: "10px",
            borderBottom: "2px solid black",
          }}
        >
          Generar nuevo profesional
        </h2>
        <FormGroup>
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
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido"
                variant="outlined"
                name="nombreYApellidoProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MedicationIcon />
              <TextField
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Especialidad"
                variant="outlined"
                name="especialidadProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Matrícula"
                variant="outlined"
                name="matriculaProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <ImportContactsIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="CUIT"
                variant="outlined"
                name="cuitProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <ImportContactsIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                name="dniProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <HouseIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <LocationCityIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CalendarMonthIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Fecha Venc. RNP"
                  name="fechaVencimientoRnpProfesional"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechaVencimientoRnpProfesional",
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
              <PhoneInTalkIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                name="telefonoProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MailIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                name="emailProfesional"
                onChange={handleChange}
              />
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
