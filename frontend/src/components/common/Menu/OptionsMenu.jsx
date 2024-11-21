/* eslint-disable react/prop-types */
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const OptionsMenu = ({ handleChange, name, array, initialValue }) => {
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

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "gray", width: "200px" }}
      >
        {type || initialValue}
      </Button>
      <Menu
        disableScrollLock={true}
        sx={{ color: "gray", width: "auto" }}
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
                target: { name, value: element.value },
              });
              handleSelect(element.name);
            }}
          >
            {element.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
