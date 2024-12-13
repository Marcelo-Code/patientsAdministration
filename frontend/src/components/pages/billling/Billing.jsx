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

export const Billing = ({ handleGoBack }) => {
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <CudBillingListContainer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NoCudBillingListContainer />
      </CustomTabPanel>
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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}
