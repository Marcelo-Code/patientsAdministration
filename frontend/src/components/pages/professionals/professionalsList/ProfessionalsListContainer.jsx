import { useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { getProfessionals } from "../../../../api/professionals";
import { Spinner } from "../../../common/spinner/Spinner";

export const ProfessionalsListContainer = () => {
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getProfessionals()
      .then((response) => setProfessionalsRecords(response))
      .catch((error) => console.log(error));
  }, [updateList]);

  if (!professionalsRecords) return <Spinner />;

  const props = {
    professionalsRecords,
    editMode,
    updateList,
    setUpdateList,
    handleChange,
  };

  return <ProfessionalsList {...props} />;
};
