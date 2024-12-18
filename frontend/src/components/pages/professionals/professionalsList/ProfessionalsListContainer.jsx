import { useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Spinner } from "../../../common/spinner/Spinner";
import { getProfessionalsRecords } from "../../../../api/professionals";
import { Footer } from "../../../layout/footer/Footer";

export const ProfessionalsListContainer = () => {
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getProfessionalsRecords()
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

  return (
    <>
      <ProfessionalsList {...props} />
      <Footer />
    </>
  );
};
