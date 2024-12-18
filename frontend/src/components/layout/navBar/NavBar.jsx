import { useContext } from "react";
import { BurguerMenu } from "../../common/burguerMenu/BurguerMenu";
import { SwitchMode } from "../../common/switchMode/SwitchMode";
import "./navBar.css";
import { GeneralContext } from "../../../context/GeneralContext";

export const NavBar = () => {
  const { darkMode, setDarkMode } = useContext(GeneralContext);
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
      }}
    >
      <BurguerMenu />
      <img
        src="/elReinoDelReves.png"
        alt=""
        style={{ width: "80px", height: "80px" }}
      />
      <div>Nombre de la Aplicación</div>
      <SwitchMode onChange={handleDarkModeChange} />
    </div>
  );
};
