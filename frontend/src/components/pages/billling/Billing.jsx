/* eslint-disable react/prop-types */
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import "./billing.css";
import { NoCudBillingListContainer } from "./noCudBilling/noCudBillingList/NoCudBillingListContainer";
import { CudBillingListContainer } from "./cudBilling/cudBillingList/CudBillingListContainer";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Billing = ({
  handleGoBack,
  setNoCudBillingRecords,
  noCudBillingRecords,
  patientsRecords,
  professionalsRecords,
  updateList,
  setUpdateList,
  filteredNoCudBillingRecords,
  filteredCudBillingRecords,
  cudBillingRecords,
  setPageIsLoading,
  patientId,
  professionalId,
  name,
}) => {
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const cudBillingListContainerProps = {
    filteredCudBillingRecords,
    professionalsRecords,
    patientsRecords,
    cudBillingRecords,
    updateList,
    setUpdateList,
    patientId,
    professionalId,
  };

  const noCudBillingListContainerProps = {
    setNoCudBillingRecords,
    noCudBillingRecords,
    patientsRecords,
    professionalsRecords,
    updateList,
    setUpdateList,
    filteredNoCudBillingRecords,
    patientId,
    professionalId,
  };

  setPageIsLoading(false);

  return (
    <div
      style={{
        position: "relative",
        top: "20px",
        width: "100vw ",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "100px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleGoBack}>Volver</Button>
      </div>
      <h2 style={{ textAlign: "center" }}>
        Facturación
        {patientId
          ? ` paciente ${name.nombreyapellidopaciente}`
          : professionalId
          ? ` profesional ${name.nombreyapellidoprofesional}`
          : " general"}
      </h2>
      <Box sx={{}}>
        {/* Contenedor de pestañas */}
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
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CudBillingListContainer {...cudBillingListContainerProps} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <NoCudBillingListContainer {...noCudBillingListContainerProps} />
        </CustomTabPanel>
      </Box>
    </div>
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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}
