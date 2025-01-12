import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import { documentData } from "./DocumentData";
import "./documentCard.css";
import { Spinner } from "../../common/spinner/Spinner";
import { Documentation } from "./Documentation";
import { getPatientRecord } from "../../../api/pacientes/patients";

export const DocumentationContainer = () => {
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);
  const { patientId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const initialStateUploadDocumentation = {
    imgdnifrentepaciente: false,
    imgdnidorsopaciente: false,
    imgdnifrentetitularos: false,
    imgdnidorsotitularos: false,
    imgcarnetospaciente: false,
    imgcarnetostitular: false,
    imgconstanciaalumnoregular: false,
    imgcud: false,
    imgcertificadoeventual: false,
  };

  const [uploadDocumentation, setUploadDocumentation] = useState(
    initialStateUploadDocumentation
  );

  const handleEditModeChange = () => {
    setEditMode(!editMode);
    editMode && setUploadDocumentation(initialStateUploadDocumentation);
  };

  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getPatientRecord(patientId)
      .then((response) => {
        setPatient(response);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  }, [patientId, updateList, setPageIsLoading]);

  const handleClick = (name) => {
    setUploadDocumentation((prevState) => ({
      ...uploadDocumentation,
      [name]: !prevState[name],
    }));
  };

  if (!patient) return <Spinner />;

  const props = {
    patient,
    documentData,
    uploadDocumentation,
    handleClick,
    editMode,
    setUpdateList,
    setUploadDocumentation,
    initialStateUploadDocumentation,
    handleEditModeChange,
    handleGoBack,
    isLoading,
    setIsLoading,
    setPageIsLoading,
    userRolRecord,
  };

  return (
    <>
      <Documentation {...props} />;
    </>
  );
};
