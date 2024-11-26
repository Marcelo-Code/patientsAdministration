/* eslint-disable react/prop-types */
import { Button, TextareaAutosize } from "@mui/material";
import "./medicalHistory.css";
import { Link } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { meetings } from "../../common/Menu/meetings";
import { getProfessionals } from "../../../api/professionals";
import { OptionsMenu } from "../../common/Menu/OptionsMenu";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";

export const MedicalHistory = ({
  patient,
  handleChange,
  handleSubmit,
  cancelAction,
  goBackAction,
  isLoading,
  modifiedFlag,
}) => {
  const arrayMeetings = meetings;

  const propsMeetings = {
    name: "tipoConsulta",
    array: arrayMeetings,
    handleChange,
    initialValue: "Selecc. Reunión",
  };

  const [arrayProfessionals, setArrayProfessionals] = useState(null);
  useEffect(() => {
    getProfessionals()
      .then((response) => {
        setArrayProfessionals(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const array = arrayProfessionals
    ? arrayProfessionals.map((element) => ({
        id: element.id,
        value: element.id,
        name: element.nombreyapellidoprofesional,
      }))
    : [];

  const propsProfessionals = {
    name: "idProfesional",
    array: array,
    handleChange,
    initialValue: "Selecc. Profesional",
  };

  return (
    <div className="medicalHistory">
      <span
        style={{
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
        <h2 style={{ marginRight: "10px" }}>Generar Nuevo Report: </h2>
        <h2> {patient.nombreyapellidopaciente}</h2>
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
          paddingBottom: "10px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "150px" }}
            name="fechaConsulta"
            onChange={(newDate) =>
              handleChange({
                target: {
                  name: "fechaConsulta",
                  value: dayjs(newDate).format("YYYY-MM-DD"),
                },
              })
            }
            format="DD/MM/YYYY"
            label="Fecha"
            slots={{
              openPickerIcon: CalendarMonthIcon,
            }}
          />
        </LocalizationProvider>
        <span>
          <OptionsMenu {...propsProfessionals} />
        </span>
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
        }}
        aria-label="minimum height"
        minRows={3}
        placeholder="Escribí el texto de tu consulta"
        name="descripcion"
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
            onClick={(e) => handleSubmit(e)}
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
