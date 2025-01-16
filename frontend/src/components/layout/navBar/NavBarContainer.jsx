import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import dayjs from "dayjs";
import { GeneralContext } from "../../../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { ConfirmAlert } from "../../common/alerts/alerts";
import { getPatientsRecords } from "../../../api/pacientes/patients";
import { getProfessionalsRecords } from "../../../api/profesionales/professionals";
import { Spinner } from "../../common/spinner/Spinner";

export const NavBarContainer = () => {
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const { updateAlertsList } = useContext(GeneralContext);
  const navigate = useNavigate();

  const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));

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
  }, [updateAlertsList]);

  const professionalsExpirationRnpRecords = (professionalsRecords || [])
    .map((record) => {
      if (
        userRolRecord?.user?.perfil === "profesional" &&
        record.id !== parseInt(userRolRecord?.user?.idprofesional)
      ) {
        return null; // Si no coincide, devuelve null, y luego lo filtramos.
      }
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientornpprofesional);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidoprofesional: record.nombreyapellidoprofesional,
        diasexpiracionrnp: daysOfDifference,
      };
    })
    .filter((record) => record !== null) // Filtra los nulls
    .filter((record) => record.diasexpiracionrnp < 30);

  const filteredPatientsRecords = (patientsRecords || []).filter(
    (record) => record.cud
  );

  const patientsExpirationCudRecords =
    userRolRecord?.user?.perfil === "admin"
      ? filteredPatientsRecords
          .map((record) => {
            const currentDate = dayjs();
            const expirationDate = dayjs(record.fechavencimientocud);
            const daysOfDifference = expirationDate.diff(currentDate, "day");
            return {
              nombreyapellidopaciente: record.nombreyapellidopaciente,
              diasexpiracioncud: daysOfDifference,
            };
          })
          .filter((record) => record.diasexpiracioncud < 30)
      : [];

  // console.log(professionalsExpirationRnpRecords);

  const handleLogout = async () => {
    try {
      const result = await ConfirmAlert(
        "¿Estás seguro de cerrar sesión?",
        "",
        "Aceptar",
        "Cancelar"
      );
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Borra el token
        localStorage.removeItem("userRolRecord"); // Borra el usuario
        localStorage.removeItem("isAuthenticated"); // Borra el usuario
        navigate("/login");
      } // Redirige al login
    } catch (error) {
      console.log("Error al cerrar sesión: ", error);
    }
  };

  const navBarProps = {
    patientsExpirationCudRecords,
    professionalsExpirationRnpRecords,
    handleLogout,
    userRolRecord,
  };

  return <NavBar {...navBarProps} />;
};
