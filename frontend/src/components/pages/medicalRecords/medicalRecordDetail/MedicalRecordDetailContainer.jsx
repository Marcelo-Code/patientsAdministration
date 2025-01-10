import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../../../../context/GeneralContext";
import { Spinner } from "../../../common/spinner/Spinner";
import { MedicalRecordDetail } from "./MedicalRecordDetail";
import { getMedicalRecords } from "../../../../api/consultas/medicalRecords";

export const MedicalRecordDetailContainer = () => {
  const { medicalRecordId } = useParams();
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);
  const [medicalDetailRecord, setMedicalDetailRecord] = useState(null);

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
    getMedicalRecords(medicalRecordId)
      .then((response) => {
        const medicalRecord = response.filter(
          (record) => record.id === parseInt(medicalRecordId)
        );
        setMedicalDetailRecord(medicalRecord);
        console.log(medicalRecord);
      })
      .catch((error) => console.log(error));
  }, [medicalRecordId, setPageIsLoading, setMedicalDetailRecord]);

  if (!medicalDetailRecord) return <Spinner />;

  const medicalRecordDetailProps = {
    handleGoBack,
    medicalDetailRecord,
    setPageIsLoading,
  };

  return (
    <>
      <MedicalRecordDetail {...medicalRecordDetailProps} />
    </>
  );
};
