import { useContext } from "react";
import { Billing } from "./Billing";
import { GeneralContext } from "../../../context/GeneralContext";

export const BillingContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  const props = {
    handleGoBack,
  };

  return <Billing {...props} />;
};
