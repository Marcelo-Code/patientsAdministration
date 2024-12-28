/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import HouseIcon from "@mui/icons-material/House";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import MedicationIcon from "@mui/icons-material/Medication";
import CakeIcon from "@mui/icons-material/Cake";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";

import "./professionalDetail.css";
import { Link } from "react-router-dom";

export const ProfessionalDetail = ({
  professionalRecord,
  handleGoBack,
  setPageIsLoading,
}) => {
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
    marginRight: "5px",
  };

  setPageIsLoading(false);

  return (
    <div className="professionalDetailContainer">
      <Card
        sx={{
          minWidth: "320px",
          width: "60%",
          color: "text.secondary",
          margin: "20px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            <div>
              <PhoneInTalkIcon sx={{ ...lineStyle, verticalAlign: "middle" }} />
              {professionalRecord.telefonoprofesional}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span>
                <MailIcon
                  sx={{
                    ...lineStyle,
                    marginLeft: "5px",
                    verticalAlign: "middle",
                  }}
                />
                {professionalRecord.emailprofesional}
              </span>
            </div>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              borderBottom: "1px solid black",
              padding: "10px",
            }}
            gutterBottom
            variant="h4"
            component="div"
          >
            {professionalRecord.nombreyapellidoprofesional}
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
            <CardMembershipIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Especialidad: </b>
              {professionalRecord.especialidadprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Matrícula: </b>
              {professionalRecord.matriculaprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <ImportContactsIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> CUIT: </b>
              {professionalRecord.cuitprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <ImportContactsIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> DNI: </b>
              {professionalRecord.dniprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <HouseIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Dirección: </b>
              {professionalRecord.direccionprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <LocationCityIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Ciudad: </b>
              {professionalRecord.ciudadprofesional}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Fecha Venc. RNP: </b>
              {new Date(
                professionalRecord.fechavencimientornpprofesional
              ).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}> Ultima Actualización: </b>
              {new Date(
                professionalRecord.fechaultimaactualizacion
              ).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
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
            to={`/professionalDocumentation/${professionalRecord.id}`}
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
              startIcon={<DescriptionIcon />}
            >
              Documentación
            </Button>
          </Link>
          <Link
            to={`/professionalBilling/${professionalRecord.id}`}
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
            <Link
              to={`/professionalMedicalRecordsList/${professionalRecord.id}`}
            >
              <Button
                size="small"
                sx={buttonStyle}
                variant="contained"
                startIcon={<LocalHospitalIcon />}
              >
                H. Report
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
