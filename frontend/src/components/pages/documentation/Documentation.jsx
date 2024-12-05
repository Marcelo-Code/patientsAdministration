/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { DocumentCardContainer } from "../../common/documentCard/DocumentCardContainer";
import "./documentation.css";

export const Documentation = ({ handleGoBack, patientId }) => {
  const props = {
    patientId,
    handleGoBack,
  };
  return (
    <div className="documentation">
      <DocumentCardContainer {...props} />
    </div>
  );
};
