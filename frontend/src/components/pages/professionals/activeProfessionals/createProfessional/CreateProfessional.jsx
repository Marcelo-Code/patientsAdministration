/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
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
import { useEffect } from "react";

export const CreateProfessional = ({
  handleChange,
  handleSubmit,
  isLoading,
  modifiedFlag,
  cancelAction,
  goBackAction,
  dniMatch,
  setPageIsLoading,
  errors,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        position: "relative",
        top: 0,
        paddingBottom: "100px",
      }}
    >
      <form>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            margin: "10px",
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
              {errors.nombreyapellidoprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido"
                variant="outlined"
                name="nombreyapellidoprofesional"
                onChange={handleChange}
                error={!!errors.nombreyapellidoprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.especialidadprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <MedicationIcon />
              )}
              <TextField
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Especialidad"
                variant="outlined"
                name="especialidadprofesional"
                onChange={handleChange}
                error={!!errors.especialidadprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.matriculaprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <CardMembershipIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Matrícula"
                variant="outlined"
                name="matriculaprofesional"
                onChange={handleChange}
                error={!!errors.matriculaprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.cuitprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <ImportContactsIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="CUIT"
                variant="outlined"
                name="cuitprofesional"
                onChange={handleChange}
                error={!!errors.cuitprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.dniprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : dniMatch ? (
                <span>❌</span>
              ) : (
                <span>✔️</span>
              )}
              {/* <ImportContactsIcon /> */}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                name="dniprofesional"
                onChange={handleChange}
                error={!!errors.dniprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.direccionprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <HouseIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionprofesional"
                onChange={handleChange}
                error={!!errors.direccionprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.ciudadprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <LocationCityIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadprofesional"
                onChange={handleChange}
                error={!!errors.ciudadprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.fechavencimientornpprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <CalendarMonthIcon />
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Fecha Venc. RNP"
                  name="fechavencimientornpprofesional"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechavencimientornpprofesional",
                        value: dayjs(newDate).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  error={!!errors.fechavencimientornpprofesional} // Error si el campo no es válido
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </LocalizationProvider>
            </span>
            <span style={style}>
              {errors.telefonoprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PhoneInTalkIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                name="telefonoprofesional"
                onChange={handleChange}
                error={!!errors.telefonoprofesional} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.emailprofesional ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <MailIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                name="emailprofesional"
                onChange={handleChange}
                error={!!errors.emailprofesional} // Error si el campo no es válido
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
