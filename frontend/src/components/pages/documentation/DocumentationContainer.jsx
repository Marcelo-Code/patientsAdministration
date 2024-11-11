import { Documentation } from "./documentation";
import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";

export const DocumentationContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  const props = {
    handleGoBack,
  };

  return <Documentation {...props} />;
};
