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
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MedicationIcon from "@mui/icons-material/Medication";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

import "./createNoCudBilling.css";
import dayjs from "dayjs";
import { OptionsMenu } from "../../../../common/Menu/OptionsMenu";
import { CreateNoCudBillingPacienteAdeuda } from "./CreateNoCudBillingPacienteAdeudaBool";

export const CreateNoCudBilling = ({
  handleChange,
  handleSubmit,
  isLoading,
  cancelAction,
  goBackAction,
  professionalsProps,
  patientsProps,
  modifiedFlag,
  billRecordNoCud,
  setPageIsLoading,
  professionalId,
  patientId,
  professionalRecord,
  patientRecord,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  setPageIsLoading(false);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <form>
        <FormGroup>
          <div
            style={{
              textAlign: "center",
              // width: "100%",
              margin: "10px",
              paddingBottom: "10px",
              borderBottom: "2px solid black",
            }}
          >
            {patientId && (
              <h2>
                Generar nueva facturación no CUD: paciente{" "}
                {patientRecord.nombreyapellidopaciente}
              </h2>
            )}
            {professionalId && (
              <h2>
                Generar nueva facturación no CUD: profesional{" "}
                {professionalRecord.nombreyapellidoprofesional}
              </h2>
            )}
            {!professionalId && !patientId && (
              <h2>Generar nueva facturación no CUD:</h2>
            )}
          </div>
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
            <span style={{ ...style, pointerEvents: professionalId && "none" }}>
              <PersonIcon />
              <OptionsMenu {...professionalsProps} />
            </span>
            <span style={style}>
              <MedicationIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Prestación"
                variant="outlined"
                name="prestacion"
                onChange={handleChange}
              />
            </span>
            <span style={{ ...style, pointerEvents: patientId && "none" }}>
              <PersonIcon />
              <OptionsMenu {...patientsProps} />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Modo Pago"
                variant="outlined"
                name="modopago"
                value={billRecordNoCud.modopago}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Medio de Pago"
                variant="outlined"
                name="mediopago"
                value={billRecordNoCud.mediopago}
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
                label="Destinatario Pago"
                variant="outlined"
                name="destinatariopago"
                value={billRecordNoCud.destinatariopago}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                type="number"
                label="Monto Sesión"
                variant="outlined"
                name="montosesion"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                type="number"
                disabled={true}
                label="Retención 35%"
                variant="outlined"
                name="retencion"
                value={
                  billRecordNoCud.retencion !== 0 && billRecordNoCud.retencion
                    ? parseFloat(billRecordNoCud.retencion).toFixed(2)
                    : ""
                }
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                type="number"
                disabled={true}
                label="Monto Final Profesional"
                variant="outlined"
                name="montofinalprofesional"
                value={
                  billRecordNoCud.montofinalprofesional !== 0 &&
                  billRecordNoCud.montofinalprofesional
                    ? parseFloat(billRecordNoCud.montofinalprofesional).toFixed(
                        2
                      )
                    : ""
                }
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Fecha de Pago"
                  name="fechadepago"
                  maxDate={dayjs()}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechadepago",
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
              <PersonIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Destinatario Pago"
                variant="outlined"
                name="destinatario"
                value={billRecordNoCud.destinatario}
                onChange={handleChange}
              />
            </span>
            <span
              style={{
                ...style,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>
                <MonetizationOnIcon
                  sx={{ marginRight: "5px", verticalAlign: "middle" }}
                />
                Paciente Adeuda
              </span>
              <RadioGroup
                row
                sx={{
                  margin: "10px",
                  width: "200px",
                  justifyContent: "center",
                }}
                value={billRecordNoCud.pacienteadeuda ? "yes" : "no"}
                name="pacienteadeuda"
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "pacienteadeuda",
                      value: value,
                    },
                  });
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </span>
            {billRecordNoCud.pacienteadeuda && (
              <CreateNoCudBillingPacienteAdeuda
                handleChange={handleChange}
                billRecordNoCud={billRecordNoCud}
              />
            )}
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
