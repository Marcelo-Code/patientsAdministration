import { useContext } from "react";
import { ProfessionalDetail } from "./ProfessionalDetail";
import { Spinner } from "../../../common/spinner/Spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { useEffect } from "react";
import { getProfessionalRecord } from "../../../../api/profesionales/professionals";

export const ProfessionalDetailContainer = () => {
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

  const professionalDetailProps = {
    handleGoBack,
    professionalRecord,
    setPageIsLoading,
    userRolRecord,
  };

  return (
    <>
      <ProfessionalDetail {...professionalDetailProps} />{" "}
    </>
  );
};
