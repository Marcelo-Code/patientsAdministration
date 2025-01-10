import { Button, TextareaAutosize, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SaveIcon from "@mui/icons-material/Save";
import { meetings } from "../../../common/Menu/meetings";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";

import "./editMedicalRecord.css";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
export const EditMedicalRecord = ({
  handleChange,
  goBackAction,
  handleSubmit,
  medicalRecord,
  patientRecord,
  professionalRecord,
  professionalsRecords,
  patientsRecords,
  modified,
  modifiedFlag,
  cancelAction,
  isLoading,
  setPageIsLoading,
  professionalId,
  patientId,
}) => {
  //Props para el menú de tipo de consulta
  const arrayMeetings = meetings;
  const propsMeetings = {
    name: "tipoconsulta",
    array: arrayMeetings,
    handleChange,
    initialValue: medicalRecord.tipoconsulta,
    modified: modified.tipoconsulta,
  };

  //Props para el menú de profesionales
  const professionalsArray = professionalsRecords.map((element) => ({
    id: element.id,
    value: element.id,
    name: element.nombreyapellidoprofesional,
  }));

  //Props para el menú de pacientes
  const patientsArray = patientsRecords.map((element) => ({
    id: element.id,
    value: element.id,
    name: element.nombreyapellidopaciente,
  }));

  const propsProfessionals = {
    name: "idprofesional",
    array: professionalsArray,
    handleChange,
    initialValue: professionalRecord.nombreyapellidoprofesional,
    modified: modified.idprofesional,
  };

  const propsPatients = {
    name: "idpaciente",
    array: patientsArray,
    handleChange,
    initialValue: patientRecord.nombreyapellidopaciente,
    modified: modified.idpaciente,
  };

  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

  return (
    <div className="medicalHistoryContainer">
      <span
        style={{
          padding: "10px",
          width: "80%",
          minWidth: "280px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottom: "2px solid black",
          marginBottom: "10px",
          paddingBottom: "10px",
          alignItems: "center",
        }}
      >
        {patientId !== "null" && professionalId === "null" && (
          <>
            <h2 style={{ marginRight: "10px", textAlign: "center" }}>
              Editar Report Paciente:{" "}
            </h2>
            <h2> {patientRecord.nombreyapellidopaciente}</h2>
          </>
        )}
        {professionalId !== "null" && patientId === "null" && (
          <>
            <h2 style={{ marginRight: "10px", textAlign: "center" }}>
              Editar Report Profesional:{" "}
            </h2>
            <h2> {professionalRecord.nombreyapellidoprofesional}</h2>
          </>
        )}
        {professionalId === "null" && patientId === "null" && (
          <>
            <h2 style={{ marginRight: "10px", textAlign: "center" }}>
              Editar Report:
            </h2>
          </>
        )}
      </span>
      <div
        style={{
          width: "80%",
          minWidth: "280px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "10px",
          borderBottom: "2px solid black",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "150px", backgroundColor: "white" }}
            name="fechaConsulta"
            value={dayjs(medicalRecord.fechaconsulta)}
            maxDate={dayjs()}
            format="DD-MM-YYYY"
            onChange={(newDate) => {
              handleChange({
                target: {
                  name: "fechaconsulta",
                  value: dayjs(newDate).format("YYYY-MM-DD"),
                },
              });
            }}
            label="Fecha"
            slots={{
              textField: TextField,
              openPickerIcon: CalendarMonthIcon,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                InputProps: {
                  endAdornment: (
                    <CalendarMonthIcon
                      sx={{
                        color: modified.fechaconsulta ? "red" : "gray",
                        cursor: "pointer",
                      }}
                    />
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>

        {patientId && professionalId === "null" && (
          <span>
            <OptionsMenu {...propsProfessionals} />
          </span>
        )}
        {professionalId && patientId === "null" && (
          <span>
            <OptionsMenu {...propsPatients} />
          </span>
        )}

        <span>
          <OptionsMenu {...propsMeetings} />
        </span>
      </div>
      <TextareaAutosize
        style={{
          maxWidth: "80%",
          width: "80%",
          minWidth: "280px",
          height: "100px",
          borderColor: modified.descripcion ? "red" : "gray",
        }}
        aria-label="minimum height"
        minRows={3}
        placeholder="Escribí el texto de tu consulta"
        name="descripcion"
        value={medicalRecord.descripcion}
        onChange={handleChange}
      />
      <div className="buttonMedicalHistory">
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
    </div>
  );
};
