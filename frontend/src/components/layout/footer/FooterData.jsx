/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FooterData = ({ darkMode }) => {
  return (
    <Accordion slotProps={{ heading: { component: "h4" } }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        style={{
          backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
          display: "flex", // Asegura que el contenido se distribuya con Flexbox
          flexDirection: "row-reverse", // Coloca el icono al lado izquierdo
        }}
      >
        <span
          style={{
            width: "100%",
            textAlign: "left",
            fontWeight: "bold",
            textShadow: "0 0 20px black",
          }}
        >
          Canales de Contacto
        </span>
      </AccordionSummary>
      <AccordionDetails
        style={{
          backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
        }}
      >
        <div>
          <b>E-mail para recepción CVs:</b> equiporeinodelreves@gmail.com
        </div>
        <div>
          <b>E-mail para administración:</b> elreinodelreves.admi@gmail.com
        </div>
        <div>
          <b>
            E-mail para coordinación clínica -informes institucionales e
            interinstitucionales-:
          </b>{" "}
          coordinacionclinica.reinodreves@gmail.com
        </div>
        <div>
          <b>E-mail inscripción a espacios de-formación:</b>{" "}
          inscripcioneselreinodelreves@gmail.com
        </div>
        <div style={{ marginTop: "20px" }}>
          <b>Teléfono administración:</b> 3416529113
        </div>
        <div>
          <b>Horarios de atención administración:</b> martes, jueves y viernes 9
          hs a 14 hs
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
