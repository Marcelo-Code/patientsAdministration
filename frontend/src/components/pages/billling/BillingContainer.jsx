import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { Billing } from "./Billing";

export const BillingContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  const props = {
    handleGoBack,
  };
  return <Billing {...props} />;
};
