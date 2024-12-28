import { useContext, useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Spinner } from "../../../common/spinner/Spinner";
import { getProfessionalsRecords } from "../../../../api/professionals";
import { Footer } from "../../../layout/footer/Footer";
import { GeneralContext } from "../../../../context/GeneralContext";

export const ProfessionalsListContainer = () => {
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { setPageIsLoading } = useContext(GeneralContext);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    setPageIsLoading(true);
    getProfessionalsRecords()
      .then((response) => setProfessionalsRecords(response))
      .catch((error) => console.log(error));
  }, [updateList, setPageIsLoading]);

  if (!professionalsRecords) return <Spinner />;

  const props = {
    professionalsRecords,
    editMode,
    updateList,
    setUpdateList,
    handleChange,
    setPageIsLoading,
  };

  return (
    <>
      <ProfessionalsList {...props} />
    </>
  );
};
