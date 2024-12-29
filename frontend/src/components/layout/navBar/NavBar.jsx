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
  const { darkMode, pageIsLoading } = useContext(GeneralContext);
  const altertsProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
  };
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
        position: pageIsLoading ? "absolute" : "relative",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <BurguerMenu />
      <span
        style={{
          display: "flex",
          alignItems: "center",
          width: "200px",
        }}
      >
        <span>
          <img
            src="/elReinoDelReves.png"
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
        </span>
        <span className="title">Gestión Cudnocud</span>
      </span>
      <Alerts {...altertsProps} />
    </div>
  );
};
