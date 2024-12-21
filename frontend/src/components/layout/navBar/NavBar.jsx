import { useContext } from "react";
import { BurguerMenu } from "../../common/burguerMenu/BurguerMenu";
import "./navBar.css";
import { GeneralContext } from "../../../context/GeneralContext";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Badge } from "@mui/material";

export const NavBar = () => {
  const { darkMode } = useContext(GeneralContext);
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
        <div className="title">Cud No Cud</div>
      </span>
      <Badge badgeContent={4} color="primary">
        <NotificationsActiveIcon color="action" />
      </Badge>
    </div>
  );
};
