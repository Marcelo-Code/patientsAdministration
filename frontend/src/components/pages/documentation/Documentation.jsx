/* eslint-disable react/prop-types */
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
