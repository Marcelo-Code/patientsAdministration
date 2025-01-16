/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { BurguerMenu } from "../../common/burguerMenu/BurguerMenu";
import { GeneralContext } from "../../../context/GeneralContext";
import { Alerts } from "../alerts/Alerts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import "./navBar.css";

export const NavBar = ({
  patientsExpirationCudRecords,
  professionalsExpirationRnpRecords,
  handleLogout,
  userRolRecord,
}) => {
  const { darkMode, pageIsLoading } = useContext(GeneralContext);
  const altertsProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
  };

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
        maxHeight: "170px",
        gap: "10px",
      }}
    >
      {userRolRecord ? (
        <BurguerMenu {...burguerMenuProps} />
      ) : (
        <CircularProgress size={30} color="secondary" />
      )}
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
      {userRolRecord ? (
        <Alerts {...altertsProps} />
      ) : (
        <CircularProgress size={30} color="secondary" />
      )}
      <span style={{ padding: "10px" }}>
        <Link onClick={handleLogout}>
          <LogoutIcon sx={{ color: "white" }} />
        </Link>
      </span>
    </div>
  );
};
