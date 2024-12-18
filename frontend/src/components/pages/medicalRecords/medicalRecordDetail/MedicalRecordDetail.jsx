/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

export const MedicalRecordDetail = ({ handleGoBack, medicalDetailRecord }) => {
  return (
    <div
      style={{
        marginTop: "180px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "80%", height: "auto", minHeight: "300px" }}>
        <CardContent>
          <Typography
            sx={{
              display: "flex",
              flexWrap: "wrap",
              borderBottom: "1px solid black",
              paddingBottom: "10px",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span>
              <b>Paciente: </b>
              {medicalDetailRecord[0].nombreyapellidopaciente}
            </span>
            <span>
              <b>Profesional: </b>
              {medicalDetailRecord[0].nombreyapellidoprofesional}
            </span>
            <span>
              <b>CUIT: </b>
              {medicalDetailRecord[0].cuitprofesional}
            </span>
            <span>
              <b>Matrícula: </b>
              {medicalDetailRecord[0].matriculaprofesional}
            </span>
            <span>
              <b>Especialidad: </b>
              {medicalDetailRecord[0].especialidadprofesional}
            </span>
            <span>
              <b>Fecha: </b>
              {format(
                new Date(medicalDetailRecord[0].fechaconsulta),
                "dd/MM/yyyy"
              )}
            </span>
            <span>
              <b>Tipo Consulta: </b> {medicalDetailRecord[0].tipoconsulta}
            </span>
          </Typography>
          <Typography
            sx={{
              marginTop: "10px",
              height: "100px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontFamily: "Arial",
            }}
          >
            {medicalDetailRecord[0].descripcion}
            {medicalDetailRecord.fechaconsulta}
          </Typography>
        </CardContent>
      </Card>
      <Button sx={{ width: "80%", marginTop: "20px" }} onClick={handleGoBack}>
        Volver
      </Button>
    </div>
  );
};
