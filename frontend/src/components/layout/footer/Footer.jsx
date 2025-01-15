import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import "./footer.css";
import { FooterData } from "./FooterData";

export const Footer = () => {
  const { darkMode, pageIsLoading } = useContext(GeneralContext);
  const footerDataProps = {
    darkMode,
  };
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
      <FooterData {...footerDataProps} />
      <div className="nameDeveloper">Marcelo Feltes Dos Mil Veinticinco</div>
    </div>
  );
};
