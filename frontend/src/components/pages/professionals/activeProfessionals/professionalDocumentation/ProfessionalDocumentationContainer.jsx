import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { documentData } from "./DocumentData";
import { ProfessionalDocumentation } from "./ProfessionalDocumentationA";
import { getProfessionalRecord } from "../../../../../api/profesionales/professionals";

export const ProfessionalDocumentationContainer = () => {
  const { professionalId } = useParams();
  const { handleGoBack, trimUrl, setPageIsLoading } =
    useContext(GeneralContext);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const initialStateUploadProfessionalDocumentation = {
    documentoConstanciaMatriculaProfesional: false,
    documentoCertificadoRnpProfesional: false,
    documentoTituloFrenteProfesional: false,
    documentoTituloDorsoProfesional: false,
    documentoCvProfesional: false,
    documentoConstanciaAfipProfesional: false,
    documentoConstanciaCbuProfesional: false,
    documentoDniFrenteProfesional: false,
    documentoDniDorsoProfesional: false,
    documentoSeguroProfesional: false,
  };

  const [uploadDocumentation, setUploadDocumentation] = useState(
    initialStateUploadProfessionalDocumentation
  );

  const handleEditModeChange = () => {
    setEditMode(!editMode);
    editMode &&
      setUploadDocumentation(initialStateUploadProfessionalDocumentation);
  };

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
      .then((response) => {
        setProfessionalRecord(response);
      })
      .catch((error) => console.log(error));
  }, [professionalId, updateList, setPageIsLoading]);

  if (!professionalRecord) return <Spinner />;

  //   console.log(professionalRecord);

  const professionalDocumentationProps = {
    professionalRecord,
    handleGoBack,
    documentData,
    handleEditModeChange,
    editMode,
    isLoading,
    setIsLoading,
    updateList,
    setUpdateList,
    trimUrl,
    setPageIsLoading,
  };

  return (
    <>
      <ProfessionalDocumentation {...professionalDocumentationProps} />
    </>
  );
};
