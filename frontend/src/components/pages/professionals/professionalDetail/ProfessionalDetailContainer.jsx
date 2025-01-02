import { useContext } from "react";
import { ProfessionalDetail } from "./ProfessionalDetail";
import { Spinner } from "../../../common/spinner/Spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { useEffect } from "react";
import { getProfessionalRecord } from "../../../../api/professionals";

export const ProfessionalDetailContainer = () => {
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const { professionalId } = useParams();

  useEffect(() => {
    setPageIsLoading(true);
    getProfessionalRecord(professionalId)
      .then((response) => setProfessionalRecord(response))
      .catch((error) => console.log(error));
  }, [professionalId, setPageIsLoading]);

  if (!professionalRecord) return <Spinner />;

  // console.log(professionalRecord);

  const professionalDetailProps = {
    handleGoBack,
    professionalRecord,
    setPageIsLoading,
  };

  return (
    <>
      <ProfessionalDetail {...professionalDetailProps} />{" "}
    </>
  );
};
