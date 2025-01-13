import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "../../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { getProfessionalRecord } from "../../../../../api/profesionales/professionals";
import { InactiveProfessionalDetail } from "./InactiveProfessionalDetail";

export const InactiveProfessionalDetailContainer = () => {
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const { professionalId } = useParams();

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalRecord(professionalId)
      .then((response) => setProfessionalRecord(response))
      .catch((error) => console.log(error));
  }, [professionalId, setPageIsLoading]);

  if (!professionalRecord) return <Spinner />;

  // console.log(professionalRecord);

  const InactiveProfessionalDetailProps = {
    handleGoBack,
    professionalRecord,
    setPageIsLoading,
    userRolRecord,
  };

  return (
    <>
      <InactiveProfessionalDetail {...InactiveProfessionalDetailProps} />
    </>
  );
};
