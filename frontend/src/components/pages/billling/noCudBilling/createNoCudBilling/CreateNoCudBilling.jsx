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

export const CreateNoCudBilling = ({
  handleChange,
  handleSubmit,
  isLoading,
  cancelAction,
  goBackAction,
  professionalsProps,
  patientsProps,
  modifiedFlag,
  pagomontoadeudado,
  billRecordNoCud,
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
            Generar nueva facturación no CUD
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
              <OptionsMenu {...professionalsProps} />
            </span>
            <span style={style}>
              <MedicationIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Prestación"
                variant="outlined"
                name="prestacion"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <OptionsMenu {...patientsProps} />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
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
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Medio de Pago"
                variant="outlined"
                name="mediopago"
                value={billRecordNoCud.modopago}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Destinatario"
                variant="outlined"
                name="destinatario"
                value={billRecordNoCud.destinatario}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                type="number"
                disabled={false}
                label={billRecordNoCud.montosesion === 0 && "Monto Sesión"}
                variant="outlined"
                name="montosesion"
                value={
                  billRecordNoCud.montosesion !== 0 &&
                  billRecordNoCud.montosesion
                    ? parseFloat(billRecordNoCud.montosesion).toFixed(2)
                    : ""
                }
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                type="number"
                disabled={true}
                label={billRecordNoCud.percepcion === 0 && "Percepción"}
                variant="outlined"
                name="percepcion"
                value={
                  billRecordNoCud.percepcion !== 0 && billRecordNoCud.percepcion
                    ? parseFloat(billRecordNoCud.percepcion).toFixed(2)
                    : ""
                }
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                type="number"
                disabled={true}
                label={
                  billRecordNoCud.montoapercibir === 0 && "Monto a Percibir"
                }
                variant="outlined"
                name="montoapercibir"
                value={
                  billRecordNoCud.montoapercibir !== 0 &&
                  billRecordNoCud.montoapercibir
                    ? parseFloat(billRecordNoCud.montoapercibir).toFixed(2)
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
                  sx={{ width: "200px", margin: "10px" }}
                  label="Fecha de Pago"
                  name="fechadepago"
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
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                disabled={true}
                label="Destinatario"
                variant="outlined"
                name="destinatario"
                value={billRecordNoCud.destinatario}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MonetizationOnIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                disabled={true}
                label="Paciente Adeuda"
                variant="outlined"
                name="pacienteadeuda"
                value={billRecordNoCud.pacienteadeuda}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  sx={{ width: "200px", margin: "10px" }}
                  label="Fecha Deuda"
                  name="fechadeuda"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechadeuda",
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
                Pago Monto Adeudado
              </span>
              <RadioGroup
                row
                sx={{
                  margin: "10px",
                  width: "200px",
                  justifyContent: "center",
                }}
                value={pagomontoadeudado ? "yes" : "no"}
                name="pagomontoadeudado"
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "pagomontoadeudado",
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
                  label="Fecha de Pago"
                  name="fechapagomontoadeudado"
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechapagomontoadeudado",
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
