import { useContext, useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Spinner } from "../../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { TokenContext } from "../../../../../context/TokenContext";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../../api/profesionales/professionals";
import { NotFoundRecord } from "../../../../common/errorPages/NotFoundRecord";
import { useParams } from "react-router-dom";

export const ProfessionalsListContainer = () => {
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { setPageIsLoading, updateAlertsList, setUpdateAlertsList } =
    useContext(GeneralContext);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  const { professionalId = null } = useParams();

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState();
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    console.log(userRolRecord);
    if (parseInt(professionalId)) {
      console.log("filtrado");
      getProfessionalRecord(professionalId)
        .then((response) => setProfessionalsRecords([response]))
        .catch((error) => console.log(error));
    } else {
      getProfessionalsRecords()
        .then((response) => {
          const filteredResponse = response.filter(
            (record) => record.activo === true
          );
          setProfessionalsRecords(filteredResponse);
        })
        .catch((error) => console.log(error));
    }
  }, [updateList, userRolRecord, professionalId]);

  console.log(professionalsRecords);

  // if (true) return <Spinner />;
  if (!professionalsRecords || !userRolRecord) return <Spinner />;
  if (Array.isArray(professionalsRecords) && professionalsRecords.length === 0)
    return <NotFoundRecord />;

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
