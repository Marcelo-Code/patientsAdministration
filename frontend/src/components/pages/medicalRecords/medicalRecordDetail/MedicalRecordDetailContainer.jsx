import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicalRecords } from "../../../../api/medicalRecords";
import { GeneralContext } from "../../../../context/GeneralContext";
import { Spinner } from "../../../common/spinner/Spinner";
import { MedicalRecordDetail } from "./MedicalRecordDetail";

export const MedicalRecordDetailContainer = () => {
  const { medicalRecordId } = useParams();
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);
  const [medicalDetailRecord, setMedicalDetailRecord] = useState(null);

  useEffect(() => {
    setPageIsLoading(true);
    getMedicalRecords(medicalRecordId)
      .then((response) => {
        console.log(response);
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
