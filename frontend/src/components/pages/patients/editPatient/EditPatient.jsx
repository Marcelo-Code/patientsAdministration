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
import MedicationIcon from "@mui/icons-material/Medication";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import MailIcon from "@mui/icons-material/Mail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");
import "./editPatient.css";

export const EditPatient = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };
  const {
    obrasocialpaciente,
    nombreyapellidopaciente,
    nroafiliadopaciente,
    telefonoobrasocial,
    email1obrasocial,
    email2obrasocial,
    email3obrasocial,
    nombreyapellidoreferenteobrasocial,
    dnipaciente,
    fechanacimientopaciente,
    direccionpaciente,
    telefonoresponsable,
    ciudadpaciente,
    nombreyapellidoresponsable,
    escuela,
    direccionescuela,
    telefonoescuela,
    aniogradosala,
    nombreyapellidodocentereferenteescuela,
    nombreyapellidodirectivoescuela,
    escuelaespecial,
    nombreyapellidodocentereferenteescuelaespecial,
    telefonodocentereferenteescuelaespecial,
    cud,
    fechavencimientocud,
    fechainiciotto,
    diagnosticoprevio,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
    setPageIsLoading,
  } = props;

  setPageIsLoading(false);
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
            Editar paciente
          </h2>
          {/* Obra Social Paciente */}

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
              <CardMembershipIcon
                style={{ color: modified.obrasocialpaciente ? "red" : "" }}
              />
              <TextField
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Obra Social"
                variant="outlined"
                name="obrasocialpaciente"
                value={obrasocialpaciente}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Teléfono Obra Social */}

            <span style={style}>
              <PhoneInTalkIcon
                style={{ color: modified.telefonoobrasocial ? "red" : "" }}
              />
              <TextField
                sx={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Obra Social"
                variant="outlined"
                name="telefonoobrasocial"
                value={telefonoobrasocial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Nombre y Apellido Paciente */}

            <span style={style}>
              <PersonIcon
                style={{ color: modified.nombreyapellidopaciente ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Paciente"
                variant="outlined"
                name="nombreyapellidopaciente"
                value={nombreyapellidopaciente}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* emails Obra Social */}

            <span style={style}>
              <MailIcon
                style={{ color: modified.email1obrasocial ? "red" : "" }}
              />
              <TextField
                sx={{
                  margin: "30px 10px 10px 10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="email 1 Obra Social"
                variant="outlined"
                name="email1obrasocial"
                value={email1obrasocial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            <span style={style}>
              <MailIcon
                style={{ color: modified.email2obrasocial ? "red" : "" }}
              />
              <TextField
                sx={{
                  margin: "30px 10px 10px 10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="email 2 Obra Social"
                variant="outlined"
                name="email2obrasocial"
                value={email2obrasocial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            <span style={style}>
              <MailIcon
                style={{ color: modified.email3obrasocial ? "red" : "" }}
              />
              <TextField
                sx={{
                  margin: "30px 10px 10px 10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="email 3 Obra Social"
                variant="outlined"
                name="email3obrasocial"
                value={email3obrasocial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Nro Afiliado */}

            <span style={style}>
              <CardMembershipIcon
                style={{ color: modified.nroafiliadopaciente ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nro Afiliado"
                variant="outlined"
                name="nroafiliadopaciente"
                onChange={handleChange}
                value={nroafiliadopaciente}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Referente Obra Social */}

            <span style={style}>
              <PersonIcon
                style={{
                  color: modified.nombreyapellidoreferenteobrasocial
                    ? "red"
                    : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Referente Obra Social"
                variant="outlined"
                name="nombreyapellidoreferenteobrasocial"
                onChange={handleChange}
                value={nombreyapellidoreferenteobrasocial}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* DNI */}

            <span style={style}>
              <ImportContactsIcon
                style={{ color: modified.dnipaciente ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                name="dnipaciente"
                onChange={handleChange}
                value={dnipaciente}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Fecha de Nacimiento */}

            <span style={style}>
              <CalendarIcon
                style={{
                  color: modified.fechanacimientopaciente ? "red" : "",
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Fecha Nacimiento"
                  name="fechanacimientopaciente"
                  format="DD/MM/YYYY"
                  value={dayjs(fechanacimientopaciente)}
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechanacimientopaciente",
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

            {/* dirección paciente */}

            <span style={style}>
              <HouseIcon
                style={{ color: modified.direccionpaciente ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionpaciente"
                value={direccionpaciente}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Teléfono Responsable */}

            <span style={style}>
              <WhatsAppIcon
                style={{ color: modified.telefonoresponsable ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Responsable"
                variant="outlined"
                name="telefonoresponsable"
                value={telefonoresponsable}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* ciudad */}

            <span style={style}>
              <LocationCityIcon
                style={{ color: modified.ciudadpaciente ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadpaciente"
                value={ciudadpaciente}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Nombre y Apellido Responsable */}

            <span style={style}>
              <PersonIcon
                style={{
                  color: modified.nombreyapellidoresponsable ? "red" : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Responsable"
                variant="outlined"
                name="nombreyapellidoresponsable"
                value={nombreyapellidoresponsable}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Escuela */}

            <span style={style}>
              <SchoolIcon style={{ color: modified.escuela ? "red" : "" }} />
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
                value={escuela}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Dirección Escuela */}

            <span style={style}>
              <SchoolIcon
                style={{ color: modified.direccionescuela ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Dirección Escuela"
                variant="outlined"
                name="direccionescuela"
                value={direccionescuela}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Teléfono Escuela */}

            <span style={style}>
              <WhatsAppIcon
                style={{ color: modified.telefonoescuela ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Teléfono Escuela"
                variant="outlined"
                name="telefonoescuela"
                value={telefonoescuela}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Año / Grado / Sala */}

            <span style={style}>
              <SchoolIcon
                style={{ color: modified.aniogradosala ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Año/Grado/Sala"
                variant="outlined"
                name="aniogradosala"
                value={aniogradosala}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Docente Referente Escuela */}

            <span style={style}>
              <PersonIcon
                style={{
                  color: modified.nombreyapellidodocentereferenteescuela
                    ? "red"
                    : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Doc. Ref."
                variant="outlined"
                name="nombreyapellidodocentereferenteescuela"
                value={nombreyapellidodocentereferenteescuela}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Nombre y Apellido Directivo Escuela */}

            <span style={style}>
              <PersonIcon
                style={{
                  color: modified.nombreyapellidodirectivoescuela ? "red" : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre Directivo Escuela"
                variant="outlined"
                name="nombreyapellidodirectivoescuela"
                value={nombreyapellidodirectivoescuela}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Escuela Especial */}

            <span style={style}>
              <SchoolIcon
                style={{ color: modified.escuelaespecial ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Escuela Especial"
                variant="outlined"
                name="escuelaespecial"
                value={escuelaespecial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Nombre y Apellido Docente Referente Escuela Especial */}

            <span style={style}>
              <PersonIcon
                style={{
                  color: modified.nombreyapellidodocentereferenteescuelaespecial
                    ? "red"
                    : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nom. y Ap. Doc. Ref. Esc. Esp."
                variant="outlined"
                name="nombreyapellidodocentereferenteescuelaespecial"
                value={nombreyapellidodocentereferenteescuelaespecial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Teléfono Referente Escuela Especial */}

            <span style={style}>
              <WhatsAppIcon
                style={{
                  color: modified.telefonodocentereferenteescuelaespecial
                    ? "red"
                    : "",
                }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Tel. Ref. Escuela Esp."
                variant="outlined"
                name="telefonodocentereferenteescuelaespecial"
                value={telefonodocentereferenteescuelaespecial}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>

            {/* Fecha Inicio Tratamiento */}

            <span style={style}>
              <CalendarIcon
                style={{ color: modified.fechainiciotto ? "red" : "" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Fecha inicio Tto."
                  name="fechainiciotto"
                  value={dayjs(fechainiciotto)}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechainiciotto",
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

            {/* CUD */}

            <span style={style}>
              <CardMembershipIcon
                style={{ color: modified.cud ? "red" : "" }}
              />
              <span>CUD</span>
              <RadioGroup
                row
                sx={{ margin: "10px", width: "200px" }}
                value={cud ? "yes" : "no"}
                name="cud"
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "cud",
                      value: value,
                    },
                  });
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </span>

            {/* Fecha Vencimiento CUD */}

            {cud && (
              <span style={style}>
                <CalendarIcon
                  style={{
                    color: modified.fechavencimientocud ? "red" : "",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    label="Fecha vto. CUD"
                    sx={{
                      width: "200px",
                      margin: "10px",
                      backgroundColor: "white",
                    }}
                    name="fechavencimientocud"
                    value={dayjs(fechavencimientocud)}
                    format="DD/MM/YYYY"
                    onChange={(newDate) => {
                      handleChange({
                        target: {
                          name: "fechavencimientocud",
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
            )}

            {/* Diagnóstico Previo */}

            <span style={style}>
              <MedicationIcon
                style={{ color: modified.diagnosticoprevio ? "red" : "" }}
              />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Diagnóstico Previo"
                variant="outlined"
                name="diagnosticoprevio"
                value={diagnosticoprevio}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </span>
          </Box>

          {/* Buttons */}

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
