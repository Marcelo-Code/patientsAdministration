import { BurguerMenu } from "../../common/burguerMenu/burguerMenu";
import { SwitchMode } from "../../common/switchMode/SwitchMode";
import "./navBar.css";

export const NavBar = () => {
  return (
    <div className="navBar">
      <BurguerMenu />
      <div>Nombre de la Aplicación</div>
      <SwitchMode />
    </div>
  );
};
