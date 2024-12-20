/* eslint-disable react/prop-types */
import {
  DatePicker,
  LocalizationProvider,
  CalendarIcon,
} from "@mui/x-date-pickers";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "./createNoCudBilling.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const CreateNoCudBillingPacienteAdeuda = ({
  handleChange,
  billRecordNoCud,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  return (
    <>
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
          value={billRecordNoCud.pagomontoadeudado ? "yes" : "no"}
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
      {billRecordNoCud.pagomontoadeudado && (
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
      )}
    </>
  );
};
