import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { getPatientsRecords } from "../../../api/patients";
import { getProfessionalsRecords } from "../../../api/professionals";
import { Spinner } from "../../common/spinner/Spinner";

export const NavBarContainer = () => {
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  useEffect(() => {
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
      })
      .catch((error) => console.log(error));
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!patientsRecords || !professionalsRecords) return <Spinner />;

  // console.log(patientsRecords);

  return <NavBar />;
};
