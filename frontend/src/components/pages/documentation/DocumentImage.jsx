/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog } from "@mui/material";

export const DocumentImage = ({ src }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  //Cambio el timestamp, que es un query param, asegurándome que traiga la versión más reciente de la imagen
  //Si no me trae la imagen del caché del navegador, que puede ser una imagen vieja de esa url
  const updatedSrc = `${src}?timestamp=${new Date().getTime()}`;

  return (
    <div>
      <img
        src={updatedSrc}
        alt=""
        style={{
          borderRadius: "5px",
          width: "290px",
          height: "140px",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      />

      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="lg">
        <img
          src={updatedSrc}
          alt="Imagen completa"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </Dialog>
    </div>
  );
};
