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
import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

export const CreateNoCudBillingPacienteAdeuda = ({
  handleChange,
  noCudBillingRecord,
  errors,
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
        {errors.fechadeuda ? (
          <FormHelperText>{"❌"}</FormHelperText>
        ) : (
          <CalendarIcon />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            type="date"
            sx={{ width: "200px", margin: "10px", backgroundColor: "white" }}
            label="Fecha Deuda"
            name="fechadeuda"
            maxDate={dayjs()}
            format="DD/MM/YYYY"
            error={!!errors.fechadeuda} // Error si el campo no es válido
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
          value={noCudBillingRecord.pagomontoadeudado ? "yes" : "no"}
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
      {noCudBillingRecord.pagomontoadeudado && (
        <span style={style}>
          {errors.fechapagomontoadeudado ? (
            <FormHelperText>{"❌"}</FormHelperText>
          ) : (
            <CalendarIcon />
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              type="date"
              sx={{ width: "200px", margin: "10px", backgroundColor: "white" }}
              label="Fecha de Pago"
              name="fechapagomontoadeudado"
              maxDate={dayjs()}
              format="DD/MM/YYYY"
              error={!!errors.fechapagomontoadeudado} // Error si el campo no es válido
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
