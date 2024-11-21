import { Button, TextareaAutosize } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { OptionsMenu } from "../../common/Menu/OptionsMenu";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SaveIcon from "@mui/icons-material/Save";
import { meetings } from "../../common/Menu/meetings";
import "./editMedicalRecord.css";

/* eslint-disable react/prop-types */
export const EditMedicalRecord = ({
  handleChange,
  handleGoBack,
  handleSubmit,
  medicalRecord,
  patient,
  professional,
  arrayProfessionals,
}) => {
  const arrayMeetings = meetings;

  const propsMeetings = {
    name: "tipoconsulta",
    array: arrayMeetings,
    handleChange,
    initialValue: medicalRecord.tipoconsulta,
  };

  const array = arrayProfessionals
    ? arrayProfessionals.map((element) => ({
        id: element.id,
        value: element.id,
        name: element.nombreyapellidoprofesional,
      }))
    : [];

  const propsProfessionals = {
    name: "idprofesional",
    array: array,
    handleChange,
    initialValue: professional.nombreyapellidoprofesional,
  };

  return (
    <div className="medicalHistoryContainer">
      <span
        style={{
          marginTop: "100px",
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
        <h2 style={{ marginRight: "10px" }}>Editar Report: </h2>
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
            value={dayjs(medicalRecord.fechaconsulta)}
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
            <Button size="small" sx={{ width: "280px" }} variant="contained">
              Subir Documentación
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            size="small"
            sx={{ width: "280px" }}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </div>
        <Button
          onClick={handleGoBack}
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
