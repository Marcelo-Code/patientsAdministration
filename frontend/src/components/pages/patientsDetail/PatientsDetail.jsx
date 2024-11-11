/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import HouseIcon from "@mui/icons-material/House";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UploadIcon from "@mui/icons-material/Upload";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

import "./patientDetail.css";
import { Link } from "react-router-dom";

export const PatientsDetail = (props) => {
  const {
    patientId,
    nombre,
    apellido,
    dni,
    direccion,
    personaResponsablePaciente,
    telefonoResponsable,
    obraSocial,
    nroAfiliado,
    ciudad,
    escuela,
    direccionEscuela,
    telefonoEscuela,
    anioGradoSala,
    docenteReferente,
    directivoEscuela,
    escuelaEspecial,
    nombreReferenteEscuelaEspecial,
    telefonoReferenteEscuelaEspecial,
    certificadoDiscapacidad,
    fechaVencimientoCud,
    fechaInicio,
    imagen,
    handleGoBack,
  } = props;

  const buttonStyle = {
    marginTop: "10px",
    height: "2.5em",
    minWidth: "100px",
    width: "95%",
    "@media (max-width: 800px)": {
      width: "100%",
      minWidth: "300px",
    },
  };

  const dataStyle = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle = {
    marginRight: "1px",
  };

  return (
    <div className="patientDetail">
      <Card
        sx={{
          minWidth: "320px",
          width: "60%",
          color: "text.secondary",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "auto",
            height: "85px",
            margin: "0 auto",
            paddingTop: "20px",
          }}
          image={imagen}
          title="Obra Social"
        />
        <CardContent>
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "1px solid black",
              paddingBottom: "10px",
            }}
            gutterBottom
            variant="h4"
            component="div"
          >
            {nombre} {apellido}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            "@media (max-width: 800px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardMembershipIcon sx={{ marginRight: "10px" }} />
            <span>
              <b style={{ marginRight: "10px" }}>Nro afiliado:</b> {nroAfiliado}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <ImportContactsIcon sx={{ marginRight: "10px" }} />
            <span>
              <b style={lineStyle}> DNI: </b>
              {dni}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <HouseIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Dirección: </b>
              {direccion}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}>Tel. Resp.: </b>
              {telefonoResponsable}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <LocationCityIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}>Ciudad: </b>
              {ciudad}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Pers. Resp. Paciente: </b>
              {personaResponsablePaciente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Escuela: </b>
              {escuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Dirección Escuela: </b>
              {direccionEscuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Teléfono Escuela: </b>
              {telefonoEscuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Año / Grado / Sala: </b>
              {anioGradoSala}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Docente Referente: </b>
              {docenteReferente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Directivo Escuela: </b>
              {directivoEscuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Escuela Especial: </b>
              {escuelaEspecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Ref. Esc. Esp.: </b>
              {nombreReferenteEscuelaEspecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Tel. Ref. Esc. Esp.: </b>
              {telefonoReferenteEscuelaEspecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CardMembershipIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>CUD: </b>
              {certificadoDiscapacidad}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Fecha Venc. CUD: </b>
              {fechaVencimientoCud}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Fecha inicio: </b>
              {fechaInicio}
            </span>
          </Typography>
        </CardContent>

        {/* Buttons */}
        <CardActions
          sx={{
            justifyContent: "center",
            width: "100%",
            "@media (max-width: 800px)": {
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
        >
          <Link
            to="/documentation"
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Button
              size="small"
              sx={buttonStyle}
              variant="contained"
              startIcon={<UploadIcon />}
            >
              Documentación
            </Button>
          </Link>
          <Link
            to={"/billing"}
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Button
              size="small"
              sx={buttonStyle}
              variant="contained"
              startIcon={<ReceiptIcon />}
            >
              Facturación
            </Button>
          </Link>
          <Link
            style={{
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Link to={`/medicalHistory/${patientId}`}>
              {/* <Link to="/medicalHistory/"> */}
              <Button
                size="small"
                sx={buttonStyle}
                variant="contained"
                startIcon={<LocalHospitalIcon />}
              >
                H. Clínica
              </Button>
            </Link>
          </Link>
        </CardActions>
        <CardActions>
          <Button
            onClick={handleGoBack}
            size="small"
            sx={{ height: "2.5em", width: "100%", margin: "auto" }}
          >
            Volver
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
