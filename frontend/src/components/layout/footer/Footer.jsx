import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";

export const Footer = () => {
  const { darkMode } = useContext(GeneralContext);
  return (
    <div
      style={{
        backgroundColor: darkMode ? "rgba(1, 37, 37, 0.48)" : "aqua",
        position: "relative",
        bottom: "0",
        width: "100vw",
        height: "200px",
        marginTop: "100px",
        textAlign: "center",
        paddingTop: "60px",
      }}
    >
      Footer
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
          bottom: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        😊😊
      </div>
    </div>
  );
};
