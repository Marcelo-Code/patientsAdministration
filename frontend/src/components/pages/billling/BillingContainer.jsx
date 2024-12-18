import { useContext } from "react";
import { Billing } from "./Billing";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";

export const BillingContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const { patientId = null } = useParams();

  const props = {
    handleGoBack,
    patientId,
  };

  return <Billing {...props} />;
};
