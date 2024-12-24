import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfessionalRecord } from "../../../../api/professionals";
import { Spinner } from "../../../common/spinner/Spinner";
import { ProfessionalDocumentation } from "./professionalDocumentation";
import { Footer } from "../../../layout/footer/Footer";
import { NavBarContainer } from "../../../layout/navBar/NavBarContainer";

export const ProfessionalDocumentationContainer = () => {
  const { professionalId } = useParams();
  const [professionalRecord, setProfessionalRecord] = useState(null);
  useEffect(() => {
    getProfessionalRecord(professionalId)
      .then((response) => {
        setProfessionalRecord(response);
      })
      .catch((error) => console.log(error));
  }, [professionalId]);

  if (!professionalRecord) return <Spinner />;

  //   console.log(professionalRecord);

  return (
    <>
      <NavBarContainer />
      <ProfessionalDocumentation />
      <Footer />
    </>
  );
};
