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

import "./patientDetail.css";
import { Link } from "react-router-dom";

export const PatientsDetail = (props) => {
  const {
    id,
    nombreyapellidopaciente,
    obrasocialpaciente,
    telefonoobrasocial,
    email1obrasocial,
    email2obrasocial,
    email3obrasocial,
    nombreyapellidoreferenteobrasocial,
    nroafiliadopaciente,
    dnipaciente,
    fechanacimientopaciente,
    edad,
    diagnosticoprevio,
    direccionpaciente,
    ciudadpaciente,
    nombreyapellidoresponsable,
    telefonoresponsable,
    escuela,
    direccionescuela,
    telefonoescuela,
    aniogradoSala,
    nombreyapellidodocentereferenteescuela,
    nombreyapellidodirectivoescuela,
    escuelaespecial,
    nombreyapellidodocentereferenteescuelaespecial,
    telefonodocentereferenteescuelaespecial,
    cud,
    fechavencimientocud,
    fechainiciotto,
    fechaultimaactualizacion,
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
    marginRight: "5px",
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
        <CardContent>
          <Typography
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {obrasocialpaciente}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <div>
              <PhoneInTalkIcon sx={{ ...lineStyle, verticalAlign: "middle" }} />
              {telefonoobrasocial}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {email1obrasocial !== "" ? (
                <span>
                  <MailIcon
                    sx={{
                      ...lineStyle,
                      marginLeft: "5px",
                      verticalAlign: "middle",
                    }}
                  />
                  {email1obrasocial}{" "}
                </span>
              ) : null}
              {email2obrasocial !== "" ? (
                <span>
                  <MailIcon
                    sx={{
                      ...lineStyle,
                      marginLeft: "5px",
                      verticalAlign: "middle",
                    }}
                  />
                  {email2obrasocial}{" "}
                </span>
              ) : null}
              {email3obrasocial !== "" ? (
                <span>
                  <MailIcon
                    sx={{
                      ...lineStyle,
                      marginLeft: "5px",
                      verticalAlign: "middle",
                    }}
                  />
                  {email3obrasocial}
                </span>
              ) : null}
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
            {nombreyapellidopaciente}
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
              <b style={lineStyle}> Nro afiliado: </b>
              {nroafiliadopaciente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Referente O.S.: </b>
              {nombreyapellidoreferenteobrasocial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <ImportContactsIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> DNI: </b>
              {dnipaciente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}> Fecha Nacimiento: </b>
              {new Date(fechanacimientopaciente).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CakeIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Edad: </b>
              {edad}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <HouseIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Dirección: </b>
              {direccionpaciente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}> Tel. Resp.: </b>
              {telefonoresponsable}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <LocationCityIcon sx={lineStyle} />
            <span>
              <b style={lineStyle}>Ciudad: </b>
              {ciudadpaciente}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Pers. Resp. Paciente: </b>
              {nombreyapellidoresponsable}
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
              {direccionescuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Teléfono Escuela: </b>
              {telefonoescuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Año / Grado / Sala: </b>
              {aniogradoSala}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Docente Referente: </b>
              {nombreyapellidodocentereferenteescuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Directivo Escuela: </b>
              {nombreyapellidodirectivoescuela}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <SchoolIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Escuela Especial: </b>
              {escuelaespecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <PersonIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Ref. Esc. Esp.: </b>
              {nombreyapellidodocentereferenteescuelaespecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <WhatsAppIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Tel. Ref. Esc. Esp.: </b>
              {telefonodocentereferenteescuelaespecial}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CardMembershipIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>CUD: </b>
              {cud ? "Si" : "No"}
            </span>
          </Typography>
          {cud && (
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={dataStyle}
            >
              <CalendarMonthIcon variant="h7" sx={lineStyle} />
              <span>
                <b style={lineStyle}>Fecha Venc. CUD: </b>
                {new Date(fechavencimientocud).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </Typography>
          )}
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Fecha inicio: </b>
              {new Date(fechainiciotto).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <MedicationIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Diagóstico Previo: </b>
              {diagnosticoprevio}
            </span>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <CalendarMonthIcon variant="h7" sx={lineStyle} />
            <span>
              <b style={lineStyle}>Última Actualización: </b>
              {new Date(fechaultimaactualizacion).toLocaleDateString("es-AR", {
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
            to={`/documentation/${id}`}
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
            to={`/billingPatient/${id}`}
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
            {/* <Link to={`/medicalHistory/${id}`}> */}
            <Link to={`/medicalRecordsList/${id}`}>
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
