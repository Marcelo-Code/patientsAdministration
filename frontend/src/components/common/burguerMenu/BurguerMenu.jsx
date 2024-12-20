import { slide as Menu } from "react-burger-menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useContext, useState } from "react";
import "./burguerMenu.css";
import { Link } from "react-router-dom";
import { SwitchMode } from "../switchMode/SwitchMode";
import { GeneralContext } from "../../../context/GeneralContext";

export const BurguerMenu = () => {
  const { darkMode, setDarkMode } = useContext(GeneralContext);
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };
  //Lógica para cerrar el menú luego de hacer click en algunas de las opciones
  //--------------------------------------------------------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStateChange = (state) => setMenuOpen(state.isOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={handleStateChange}
      customBurgerIcon={<MenuRoundedIcon sx={{ color: "white" }} />}
    >
      <h2 className="bm-menu-title">Título</h2>
      <div className="bm-menu-sub-title">Sub Título</div>
      <div className="bm-menu">
        <ul className="bm-item-list">
          <li>
            <SwitchMode onChange={handleDarkModeChange} />
          </li>
          <Link to="" onClick={closeMenu}>
            <li className="bm-item">Pacientes</li>
          </Link>
          <Link to="/professionalsList" onClick={closeMenu}>
            <li className="bm-item">Profesionales</li>
          </Link>
          <Link to="/MedicalRecordsList" onClick={closeMenu}>
            <li className="bm-item">Consultas</li>
          </Link>
          <Link to="/Billing" onClick={closeMenu}>
            <li className="bm-item">Facturación</li>
          </Link>
        </ul>
      </div>
    </Menu>
  );
};
