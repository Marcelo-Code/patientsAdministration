/* eslint-disable react/prop-types */
import { slide as Menu } from "react-burger-menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useContext, useState } from "react";
import "./burguerMenu.css";
import { Link } from "react-router-dom";
import { SwitchMode } from "../switchMode/SwitchMode";
import { GeneralContext } from "../../../context/GeneralContext";

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

  const professionalId = userRolRecord.user.idprofesional || null;

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={handleStateChange}
      customBurgerIcon={<MenuRoundedIcon sx={{ color: "white" }} />}
    >
      <h3
        style={{
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        Perfil: {userRolRecord?.user?.perfil || "cargando..."}
      </h3>
      <h3
        style={{
          textAlign: "center",
          borderBottom: "1px solid white",
          marginBottom: "20px",
          pointerEvents: "none",
        }}
      >
        {userRolRecord?.user?.nombreyapellidousuario || "cargando..."}
      </h3>
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
                <li className="bm-item">Pacientes Act.</li>
              </Link>
              <Link
                to={`/professionalsList/${professionalId}`}
                onClick={closeMenu}
              >
                <li className="bm-item">Profesionales Act.</li>
              </Link>
              <Link to="/MedicalRecordsList" onClick={closeMenu}>
                <li className="bm-item">Consultas/Report</li>
              </Link>
              <Link to="/Billing" onClick={closeMenu}>
                <li className="bm-item">Facturación</li>
              </Link>
              <Link to="/usersList" onClick={closeMenu}>
                <li className="bm-item">Usuarios</li>
              </Link>
            </ul>
            <ul
              className="bm-item-list"
              style={{ borderTop: "1px solid white", width: "300px" }}
            >
              <Link to={`/inactiveProfessionalsList`} onClick={closeMenu}>
                <li className="bm-item">Prof. Inactivos</li>
              </Link>
              <Link to="/inactivePatientsList" onClick={closeMenu}>
                <li className="bm-item">Pacientes Inact.</li>
              </Link>
            </ul>
          </>
        ) : (
          // Menú para perfil profesional

          <>
            <ul className="bm-item-list">
              <Link
                to={`/professionalsList/${professionalId}`}
                onClick={closeMenu}
              >
                <li className="bm-item">Mi Perfil</li>
              </Link>
              <Link to="/" onClick={closeMenu}>
                <li className="bm-item">Pacientes</li>
              </Link>
              <Link to="/MedicalRecordsList" onClick={closeMenu}>
                <li className="bm-item">Consultas/Report</li>
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
