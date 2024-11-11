/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { DocumentCardContainer } from "../../common/documentCard/DocumentCardContainer";
import "./documentation.css";

export const Documentation = ({ handleGoBack }) => {
  return (
    <div className="documentation">
      <DocumentCardContainer />
      <Button
        sx={{ margin: "20px auto", width: "300px" }}
        onClick={handleGoBack}
      >
        Volver
      </Button>
    </div>
  );
};
