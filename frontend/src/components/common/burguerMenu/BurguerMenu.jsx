import { slide as Menu } from "react-burger-menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import "./burguerMenu.css";
import { Link } from "react-router-dom";

export const BurguerMenu = () => {
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
          <Link to="/createPatient" onClick={closeMenu}>
            <li className="bm-item">Nuevo Paciente</li>
          </Link>
          <li className="bm-item">Editar Paciente</li>
        </ul>
      </div>
    </Menu>
  );
};
