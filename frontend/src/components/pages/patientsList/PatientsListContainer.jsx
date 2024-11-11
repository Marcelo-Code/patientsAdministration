import { PatientsList } from "./PatientsList";
import { dataBase } from "../../../dataBase/DataBase";
import "./patientsList.css";

export const PatientsListContainer = () => {
  const patients = dataBase;

  return (
    <div className="patientsContainer">
      {patients.map((patient) => {
        const props = {
          patientId: patient.patientId,
          nombre: patient.nombre,
          apellido: patient.apellido,
          dni: patient.dni,
          obraSocial: patient.obraSocial,
          nroAfiliado: patient.nroAfiliado,
          direccion: patient.direccion,
          ciudad: patient.ciudad,
          telefono: patient.telefono,
          imagen: patient.imagen,
        };
        return <PatientsList key={patient.patientId} {...props} />;
      })}
    </div>
  );
};
