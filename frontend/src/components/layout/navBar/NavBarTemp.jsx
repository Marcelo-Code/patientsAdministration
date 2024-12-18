import { BurguerMenu } from "../../common/burguerMenu/burguerMenu";
import { SwitchMode } from "../../common/switchMode/SwitchMode";
import "./navBar.css";

export const NavBar = () => {
  return (
    <div className="navBar">
      <BurguerMenu />
      <img
        src="/elReinoDelReves.png"
        alt=""
        style={{ width: "80px", height: "80px" }}
      />
      <div>Nombre de la Aplicación</div>
      <SwitchMode />
    </div>
  );
};
