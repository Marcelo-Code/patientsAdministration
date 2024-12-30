import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import "./footer.css";

export const Footer = () => {
  const { darkMode, pageIsLoading } = useContext(GeneralContext);
  return (
    <div
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
        position: pageIsLoading ? "absolute" : "relative",
        bottom: "0px",
        width: "100vw",
        height: "auto",
        textAlign: "center",
        marginTop: "150px",
      }}
    >
      <div className="footerTitle">Gestión Cudnocud</div>
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
      <div className="nameDeveloper">Marcelo Feltes Dos Mil Veinticinco</div>
    </div>
  );
};
