/* eslint-disable react/prop-types */
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const OptionsMenu = ({
  handleChange, //función para cambiar los valores
  name, //el nombre de la variable
  array, // array de la variable
  initialValue, //valor inicial del menú
  modified, // flag para saber si se modificó
  date = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [type, setType] = useState(null);

  const handleSelect = (type) => {
    setType(type);
    handleClose();
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Comprobar si la fecha es válida
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: modified ? "red" : "gray",
          width: "200px",
          backgroundColor: "white",
        }}
      >
        {type !== null ? type : initialValue}
      </Button>
      <Menu
        disableScrollLock={true}
        sx={{ color: "gray", width: "230px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {array.map((element) => (
          <MenuItem
            key={element.id}
            onClick={() => {
              handleChange({
                target: {
                  name,
                  value: element.value,
                  value2: element.value2 || null,
                  value3: element.value3 || null,
                  value4: element.value4 || null,
                },
              });
              handleSelect(
                date && date && isValidDate(element.name)
                  ? new Date(element.name).toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })
                  : element.name == true
                  ? "Si"
                  : element.name === false
                  ? "No"
                  : element.name
              );
            }}
          >
            {date && date && isValidDate(element.name)
              ? new Date(element.name).toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })
              : element.name == true
              ? "Si"
              : element.name === false
              ? "No"
              : element.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
