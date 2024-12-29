import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { getPatientsRecords } from "../../../api/patients";
import { getProfessionalsRecords } from "../../../api/professionals";
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
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
      })
      .catch((error) => console.log(error));
  }, []);

  // if (!patientsRecords || !professionalsRecords) return <Spinner />;

  const professionalsExpirationRnpRecords = (professionalsRecords || [])
    .map((record) => {
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientornpprofesional);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidoprofesional: record.nombreyapellidoprofesional,
        diasexpiracionrnp: daysOfDifference,
      };
    })
    .filter((record) => record.diasexpiracionrnp < 30);

  const filteredPatientsRecords = (patientsRecords || []).filter(
    (record) => record.cud
  );

  const patientsExpirationCudRecords = filteredPatientsRecords
    .map((record) => {
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientocud);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidopaciente: record.nombreyapellidopaciente,
        diasexpiracioncud: daysOfDifference,
      };
    })
    .filter((record) => record.diasexpiracioncud < 30);

  // console.log(professionalsExpirationRnpRecords);

  const navBarProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
  };

  return <NavBar {...navBarProps} />;
};
