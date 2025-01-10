/* eslint-disable react/prop-types */
import { slide as Menu } from "react-burger-menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useContext, useState } from "react";
import "./burguerMenu.css";
import { Link } from "react-router-dom";
import { SwitchMode } from "../switchMode/SwitchMode";
import { GeneralContext } from "../../../context/GeneralContext";
import { Spinner } from "../spinner/Spinner";

export const BurguerMenu = ({ userRolRecord }) => {
  const { darkMode, setDarkMode } = useContext(GeneralContext);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };
  //Lógica para cerrar el menú luego de hacer click en algunas de las opciones
  //--------------------------------------------------------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStateChange = (state) => setMenuOpen(state.isOpen);
  const closeMenu = () => setMenuOpen(false);

  if (!userRolRecord) return <Spinner />;

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={handleStateChange}
      customBurgerIcon={<MenuRoundedIcon sx={{ color: "white" }} />}
    >
      <div className="bm-menu-title">
        <div>
          <div>Gestión</div>
          <div>Cudnocud</div>
        </div>
      </div>
      <div className="bm-menu">
        <div>
          <SwitchMode onChange={handleDarkModeChange} />
        </div>

        {/* Menú para perfil "admin" */}

        {userRolRecord.user.perfil === "admin" ? (
          <>
            <ul className="bm-item-list">
              <Link to="/" onClick={closeMenu}>
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
              <Link to="/usersList" onClick={closeMenu}>
                <li className="bm-item">Usuarios</li>
              </Link>
            </ul>
          </>
        ) : (
          // Menú para perfil profesional

          <>
            <ul className="bm-item-list">
              <Link
                to={`/professionalDetail/${userRolRecord.user.idprofesional}`}
                onClick={closeMenu}
              >
                <li className="bm-item">Mi Perfil</li>
              </Link>
              <Link to="/" onClick={closeMenu}>
                <li className="bm-item">Pacientes</li>
              </Link>
              <Link to="/MedicalRecordsList" onClick={closeMenu}>
                <li className="bm-item">Consultas</li>
              </Link>
              <Link to="/Billing" onClick={closeMenu}>
                <li className="bm-item">Facturación</li>
              </Link>
            </ul>
          </>
        )}
      </div>
    </Menu>
  );
};
