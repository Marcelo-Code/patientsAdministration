/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BurguerMenu } from "../../common/burguerMenu/BurguerMenu";
import "./navBar.css";
import { GeneralContext } from "../../../context/GeneralContext";
import { Alerts } from "../alerts/Alerts";

export const NavBar = ({
  patientsExpirationCudRecords,
  professionalsExpirationRnpRecords,
}) => {
  const { darkMode } = useContext(GeneralContext);
  const altertsProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
  };
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
      }}
    >
      <BurguerMenu />
      <span style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/elReinoDelReves.png"
          alt=""
          style={{ width: "80px", height: "80px" }}
        />
        <div className="title">
          <span>Gestión</span>
          <span>Cud No Cud</span>
        </div>
      </span>
      <Alerts {...altertsProps} />
    </div>
  );
};
