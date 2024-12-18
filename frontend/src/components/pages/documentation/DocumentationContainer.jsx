import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import { documentData } from "./DocumentData";
import "./documentCard.css";
import { Spinner } from "../../common/spinner/Spinner";
import { Documentation } from "./Documentation";
import { getPatientRecord } from "../../../api/patients";
import { Footer } from "../../layout/footer/Footer";

export const DocumentationContainer = () => {
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { handleGoBack } = useContext(GeneralContext);
  const { patientId } = useParams();

  const initialStateUploadDocumentation = {
    imgDniFrente: false,
    imgDniDorso: false,
    carnetObraSocial: false,
    libretaSanitaria: false,
    cAlumnoRegular: false,
    rpYHcMedico: false,
    autorizacionOS: false,
    informesPrevios: false,
    cud: false,
  };
  const [uploadDocumentation, setUploadDocumentation] = useState(
    initialStateUploadDocumentation
  );

  const handleEditModeChange = () => {
    setEditMode(!editMode);
    editMode && setUploadDocumentation(initialStateUploadDocumentation);
  };

  useEffect(() => {
    getPatientRecord(patientId)
      .then((response) => {
        setPatient(response);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  }, [patientId, updateList]);

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
  };

  return (
    <>
      <Documentation {...props} />;
      <Footer />
    </>
  );
};
