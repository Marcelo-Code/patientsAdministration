import { Documentation } from "./documentation";
import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";

export const DocumentationContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const { patientId } = useParams();

  const props = {
    handleGoBack,
    patientId,
  };
  return <Documentation {...props} />;
};
