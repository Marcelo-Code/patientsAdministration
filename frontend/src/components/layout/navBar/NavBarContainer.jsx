import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { getPatientsRecords } from "../../../api/patients";
import { getProfessionalsRecords } from "../../../api/professionals";
import { Spinner } from "../../common/spinner/Spinner";
import dayjs from "dayjs";

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

  const filteredPatientsRecords = patientsRecords.filter(
    (record) => record.cud
  );

  const patientsExpirationCudRecords = filteredPatientsRecords
    .map((record) => {
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientocud);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidopaciente: record.nombreyapellidopaciente,
        diasexpiracion: daysOfDifference,
      };
    })
    .filter((record) => record.diasexpiracion < 30);

  console.log(patientsExpirationCudRecords);

  const navBarProps = {
    patientsExpirationCudRecords,
  };

  return <NavBar {...navBarProps} />;
};
