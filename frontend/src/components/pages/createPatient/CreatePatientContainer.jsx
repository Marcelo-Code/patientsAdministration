import { useContext, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { CreatePatient } from "./createPatient";

export const CreatePatientContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const [selectedValue, setSelectedValue] = useState("yes");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const props = {
    handleGoBack,
    handleChange,
    selectedValue,
  };
  return <CreatePatient {...props} />;
};
