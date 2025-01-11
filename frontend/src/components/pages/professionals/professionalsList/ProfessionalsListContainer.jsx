import { useContext, useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { TokenContext } from "../../../../context/TokenContext";
import { getProfessionalsRecords } from "../../../../api/profesionales/professionals";
import { NotFoundRecord } from "../../../common/errorPages/NotFoundRecord";

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
  }, [updateList]);

  if (Array.isArray(professionalsRecords) && professionalsRecords.length === 0)
    return <NotFoundRecord />;
  if (!professionalsRecords || !userRolRecord) return <Spinner />;

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
