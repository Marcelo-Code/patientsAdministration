/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormHelperText,
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
import MailIcon from "@mui/icons-material/Mail";
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
import { useEffect } from "react";

export const CreatePatient = ({
  handleChange,
  handleSubmit,
  isLoading,
  cud,
  modifiedFlag,
  cancelAction,
  goBackAction,
  patient,
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
        paddingBottom: "100px",
      }}
    >
      <form>
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
            <span style={style}>
              {errors.nombreYApellidoPaciente ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Paciente"
                variant="outlined"
                name="nombreYApellidoPaciente"
                onChange={handleChange}
                error={!!errors.nombreYApellidoPaciente}
              />
            </span>
            <span style={style}>
              {errors.obraSocialPaciente ? (
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
                label="Obra Social"
                variant="outlined"
                name="obraSocialPaciente"
                onChange={handleChange}
                error={!!errors.obraSocialPaciente} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.telefonoObraSocial ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <WhatsAppIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Obra Social"
                variant="outlined"
                name="telefonoObraSocial"
                onChange={handleChange}
                error={!!errors.telefonoObraSocial} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.email1ObraSocial ? (
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
                label="e-mail 1 Obra Social"
                variant="outlined"
                name="email1ObraSocial"
                onChange={handleChange}
                error={!!errors.email1ObraSocial} // Error si el campo no es válido
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
                label="e-mail 2 Obra Social"
                variant="outlined"
                name="email2ObraSocial"
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
                label="e-mail 3 Obra Social"
                variant="outlined"
                name="email3ObraSocial"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              {errors.nombreYApellidoReferenteObrasocial ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Referente Obra Social"
                variant="outlined"
                name="nombreYApellidoReferenteObrasocial"
                onChange={handleChange}
                error={!!errors.nombreYApellidoReferenteObrasocial} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.nroAfiliadoPaciente ? (
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
                label="Nro Afiliado"
                variant="outlined"
                name="nroAfiliadoPaciente"
                onChange={handleChange}
                error={!!errors.nroAfiliadoPaciente} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.dniPaciente ? (
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
                name="dniPaciente"
                onChange={handleChange}
                error={!!errors.dniPaciente} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.fechaNacimientoPaciente ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <CalendarIcon />
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
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
                  error={!!errors.fechaNacimientoPaciente} // Error si el campo no es válido
                />
              </LocalizationProvider>
            </span>
            <span style={style}>
              {errors.diagnosticoPrevio ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <MedicationIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Diagnóstico Previo"
                variant="outlined"
                name="diagnosticoPrevio"
                onChange={handleChange}
                error={!!errors.diagnosticoPrevio} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.direccionPaciente ? (
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
                name="direccionPaciente"
                onChange={handleChange}
                error={!!errors.direccionPaciente} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.ciudadPaciente ? (
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
                name="ciudadPaciente"
                onChange={handleChange}
                error={!!errors.ciudadPaciente} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.nombreYApellidoResponsable ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Responsable"
                variant="outlined"
                name="nombreYApellidoResponsable"
                onChange={handleChange}
                error={!!errors.nombreYApellidoResponsable} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.telefonoResponsable ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <WhatsAppIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Responsable"
                variant="outlined"
                name="telefonoResponsable"
                onChange={handleChange}
                error={!!errors.telefonoResponsable} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.escuela ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <SchoolIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Escuela"
                variant="outlined"
                name="escuela"
                onChange={handleChange}
                error={!!errors.escuela} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.direccionEscuela ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <SchoolIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Dirección Escuela"
                variant="outlined"
                name="direccionEscuela"
                onChange={handleChange}
                error={!!errors.direccionEscuela} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.telefonoEscuela ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <WhatsAppIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Escuela"
                variant="outlined"
                name="telefonoEscuela"
                onChange={handleChange}
                error={!!errors.telefonoEscuela} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.anioGradoSala ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <SchoolIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Año/Grado/Sala"
                variant="outlined"
                name="anioGradoSala"
                onChange={handleChange}
                error={!!errors.anioGradoSala} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.nombreYApellidoDocenteReferenteEscuela ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre Docente Referente"
                variant="outlined"
                name="nombreYApellidoDocenteReferenteEscuela"
                onChange={handleChange}
                error={!!errors.nombreYApellidoDocenteReferenteEscuela} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              {errors.nombreYApellidoDirectivoEscuela ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <PersonIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre Directivo Escuela"
                variant="outlined"
                name="nombreYApellidoDirectivoEscuela"
                onChange={handleChange}
                error={!!errors.nombreYApellidoDirectivoEscuela} // Error si el campo no es válido
              />
            </span>
            <span style={style}>
              <SchoolIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
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
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
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
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
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
            {patient.CUD && (
              <span style={style}>
                {errors.fechaVencimientoCud ? (
                  <FormHelperText>{"❌"}</FormHelperText>
                ) : (
                  <CalendarIcon />
                )}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    sx={{
                      width: "200px",
                      margin: "10px",
                      backgroundColor: "white",
                    }}
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
                    error={!!errors.fechaVencimientoCud}
                  />
                </LocalizationProvider>
              </span>
            )}
            <span style={style}>
              {errors.fechaInicioTto ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <CalendarIcon />
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
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
                  error={!!errors.fechaInicioTto}
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
