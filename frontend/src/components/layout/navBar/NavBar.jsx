/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { BurguerMenu } from "../../common/burguerMenu/BurguerMenu";
import { GeneralContext } from "../../../context/GeneralContext";
import { Alerts } from "../alerts/Alerts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import "./navBar.css";

export const NavBar = ({
  patientsExpirationCudRecords,
  professionalsExpirationRnpRecords,
  handleLogout,
}) => {
  const { darkMode, pageIsLoading } = useContext(GeneralContext);
  const altertsProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
  };

  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  console.log(userRolRecord);

  const burguerMenuProps = {
    userRolRecord,
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
        position: pageIsLoading ? "absolute" : "relative",
        top: 0,
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
        zIndex: 4,
        padding: "20px",
        width: "100vw",
        height: "auto",
        gap: "10px,",
      }}
    >
      <BurguerMenu {...burguerMenuProps} />
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
        <span className="navBarTitle">Gestión Cudnocud</span>
      </span>
      <Alerts {...altertsProps} />
      <span style={{ padding: "10px" }}>
        <Link onClick={handleLogout}>
          <LogoutIcon sx={{ color: "white" }} />
        </Link>
      </span>
    </div>
  );
};
