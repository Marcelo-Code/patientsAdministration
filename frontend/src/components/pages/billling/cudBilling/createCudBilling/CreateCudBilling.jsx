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
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MedicationIcon from "@mui/icons-material/Medication";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ErrorIcon from "@mui/icons-material/Error";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import "./createCudBilling.css";
import dayjs from "dayjs";
import { OptionsMenu } from "../../../../common/Menu/OptionsMenu";
import { useEffect } from "react";

export const CreateCudBilling = ({
  handleChange,
  handleSubmit,
  isLoading,
  cancelAction,
  goBackAction,
  professionalsProps,
  patientsProps,
  modifiedFlag,
  cobradaenfecha,
  cudBillingRecord,
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
          <div
            style={{
              textAlign: "center",
              margin: "10px",
              paddingBottom: "10px",
              borderBottom: "2px solid black",
            }}
          >
            {patientId && (
              <h2>
                Generar nueva facturación CUD: paciente{" "}
                {patientRecord.nombreyapellidopaciente}
              </h2>
            )}
            {professionalId && (
              <h2>
                Generar nueva facturación CUD: profesional{" "}
                {professionalRecord.nombreyapellidoprofesional}
              </h2>
            )}
            {!professionalId && !patientId && (
              <h2>Generar nueva facturación CUD:</h2>
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
              <CardMembershipIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                disabled={true}
                label="Obra Social Paciente"
                variant="outlined"
                name="obrasocialpaciente"
                value={cudBillingRecord.obrasocialpaciente}
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CalendarIcon />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  type="date"
                  views={["year", "month"]}
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Período Facturado"
                  name="periodofacturado"
                  maxDate={dayjs()}
                  format="MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "periodofacturado",
                        value: dayjs(newDate).format("YYYY-MM-01"),
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
              <ReceiptIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nro Factura"
                variant="outlined"
                name="nrofactura"
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
                label="Monto Facturado"
                variant="outlined"
                name="montofacturado"
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
                  label="Presentación O.S."
                  name="fechapresentacionos"
                  maxDate={dayjs()}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fechapresentacionos",
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
                  sx={{
                    width: "200px",
                    margin: "10px",
                    backgroundColor: "white",
                  }}
                  label="Recepción O.S."
                  name="fecharecepcionos"
                  maxDate={dayjs()}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => {
                    handleChange({
                      target: {
                        name: "fecharecepcionos",
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
                Cobrada en Fecha
              </span>
              <RadioGroup
                row
                sx={{
                  margin: "10px",
                  width: "200px",
                  justifyContent: "center",
                }}
                value={cobradaenfecha ? "yes" : "no"}
                name="cobradaenfecha"
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "cobradaenfecha",
                      value: value,
                    },
                  });
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </span>

            {!cudBillingRecord.cobradaenfecha ? (
              <>
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
                      label="Fecha Reclamo"
                      name="fechareclamo"
                      maxDate={dayjs()}
                      format="DD/MM/YYYY"
                      onChange={(newDate) => {
                        handleChange({
                          target: {
                            name: "fechareclamo",
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
                  <ErrorIcon />
                  <TextField
                    style={{
                      margin: "10px",
                      width: "200px",
                      backgroundColor: "white",
                    }}
                    id="outlined-basic"
                    label="Medio Reclamo"
                    variant="outlined"
                    name="medioreclamo"
                    onChange={handleChange}
                  />
                </span>
                <span style={style}>
                  <ErrorIcon />
                  <TextField
                    style={{
                      margin: "10px",
                      width: "200px",
                      backgroundColor: "white",
                    }}
                    id="outlined-basic"
                    label="Respuesta Reclamo"
                    variant="outlined"
                    name="respuestareclamo"
                    onChange={handleChange}
                  />
                </span>
              </>
            ) : (
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
                    label="Fecha Cobro"
                    name="fechacobro"
                    maxDate={dayjs()}
                    format="DD/MM/YYYY"
                    onChange={(newDate) => {
                      handleChange({
                        target: {
                          name: "fechacobro",
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
                label="Monto Percibido"
                variant="outlined"
                name="montopercibido"
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
                disabled={true}
                value={
                  cudBillingRecord.retencion !== 0 && cudBillingRecord.retencion
                    ? parseFloat(cudBillingRecord.retencion).toFixed(2)
                    : ""
                }
                label="Retención"
                variant="outlined"
                name="retencion"
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
                disabled={true}
                value={
                  cudBillingRecord.montofinalprofesional !== 0 &&
                  cudBillingRecord.montofinalprofesional
                    ? parseFloat(
                        cudBillingRecord.montofinalprofesional
                      ).toFixed(2)
                    : ""
                }
                label="Monto Final Profesional"
                variant="outlined"
                name="montofinalprofesional"
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
