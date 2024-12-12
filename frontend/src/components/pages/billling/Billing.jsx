/* eslint-disable react/prop-types */
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import "./billing.css";
import { CudBilling } from "./cudBilling";
import { NoCudBilling } from "./NoCudBilling";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Billing = ({
  handleGoBack,
  handleSubmit,
  billingRecords,
  updateList,
  setUpdateList,
  handleEditModeField,
  editModeFields,
  setEditModeFields,
  handleChange,
  professionalsProps,
  patientsProps,
  billRecordCud,
  modified,
  setModified,
  initialModifiedState,
  cancelAction,
  cancelTableAction,
  isLoading,
  menuFilterProps,
  trimUrl,
}) => {
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
    !editMode && setModified(initialModifiedState);
    editMode && setEditModeFields(null);
  };

  billRecordCud.percepcion = billRecordCud.montopercibido * 0.35;
  billRecordCud.montofinalprofesional =
    billRecordCud.montopercibido - billRecordCud.percepcion;

  const cudBillingProps = {
    billingRecords,
    editMode,
    handleEditModeChange,
    handleEditModeField,
    handleSubmit,
    handleChange,
    setEditModeFields,
    editModeFields,
    setUpdateList,
    updateList,
    cancelAction,
    cancelTableAction,
    professionalsProps,
    patientsProps,
    billRecordCud,
    modified,
    setModified,
    initialModifiedState,
    isLoading,
    menuFilterProps,
    trimUrl,
  };

  const noCudBillingProps = {
    billingRecords,
    editMode,
    handleEditModeChange,
    handleEditModeField,
    handleSubmit,
    handleChange,
    setEditModeFields,
    editModeFields,
    setUpdateList,
    updateList,
    cancelAction,
    cancelTableAction,
    professionalsProps,
    patientsProps,
    billRecordCud,
    modified,
    isLoading,
    menuFilterProps,
  };

  // console.log(billingRecords);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "80px",
        position: "absolute",
        top: "80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Contenedor de pestañas */}
      <Button onClick={handleGoBack}>Volver</Button>
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{}}
        >
          <Tab label="Cud" {...a11yProps(0)} />
          <Tab label="No Cud" {...a11yProps(1)} />
          <Tab label="Documentación Cud" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <CudBilling {...cudBillingProps} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NoCudBilling {...noCudBillingProps} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
    </Box>
  );
};

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
