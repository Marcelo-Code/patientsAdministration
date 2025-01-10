import { useContext, useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { TokenContext } from "../../../../context/TokenContext";
import { getProfessionalsRecords } from "../../../../api/profesionales/professionals";

export const ProfessionalsListContainer = () => {
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { setPageIsLoading, updateAlertsList, setUpdateAlertsList } =
    useContext(GeneralContext);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState();
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  console.log(userRolRecord);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
      })
      .catch((error) => console.log(error));
  }, [updateList, setPageIsLoading]);

  if (!professionalsRecords || !userRolRecord) return <Spinner />;

  console.log(userRolRecord.user);

  console.log(professionalsRecords);

  const props = {
    professionalsRecords,
    editMode,
    setUpdateList,
    handleChange,
    setPageIsLoading,
    setUpdateAlertsList,
    userRolRecord,
  };

  return (
    <>
      <ProfessionalsList {...props} />
    </>
  );
};
