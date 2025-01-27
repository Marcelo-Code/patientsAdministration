import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";

import { CreateCudBilling } from "./CreateCudBilling";
import { useParams } from "react-router-dom";
import { getProfessionalsRecords } from "../../../../../api/profesionales/professionals";
import {
  getPatientRecord,
  getPatientsRecords,
} from "../../../../../api/pacientes/patients";
import { createCudBillingRecord } from "../../../../../api/facturacionCud/cudBilling";
import { WarningAlert } from "../../../../common/alerts/alerts";

export const CreateCudBillingContainer = () => {
  const { goBackAction, createList, cancelAction, setPageIsLoading } =
    useContext(GeneralContext);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [patientRecord, setPatientRecord] = useState(null);
  const { professionalId = null, patientId = null } = useParams();

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    obrasocialpaciente: false,
    periodofacturado: false,
    nrofactura: false,
    montofacturado: false,
    fechapresentacionos: false,
    fecharecepcionos: false,
    fechareclamo: false,
    medioreclamo: false,
    respuestareclamo: false,
    cobradaenfecha: false,
    fechacobro: false,
    montopercibido: false,
    retencion: false,
    montofinalprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const cudBillingRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    obrasocialpaciente: "",
    periodofacturado: null,
    nrofactura: "",
    montofacturado: 0,
    fechapresentacionos: null,
    fecharecepcionos: null,
    fechareclamo: null,
    medioreclamo: "",
    respuestareclamo: "",
    cobradaenfecha: true,
    fechacobro: null,
    montopercibido: 0,
    retencion: 0,
    montofinalprofesional: 0,
    imgasistenciamensual: "",
    documentoinformemensual: "",
    documentofacturamensual: "",
  };
  const [cudBillingRecord, setCudBillingRecord] = useState(
    cudBillingRecordInitialState
  );

  const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));

  //Validación del formulario

  const [errors, setErrors] = useState({});

  const validateForm = (cudBillingRecord) => {
    const newErrors = {};

    const requiredFields = [
      "idprofesional",
      "prestacion",
      "idpaciente",
      "periodofacturado",
      "nrofactura",
      "montofacturado",
      "fechapresentacionos",
      // "fechacobro", //obligatorio si cobradaenfecha === true
      // "fechareclamo", //obligatorio si cobradaenfecha === false
      // "medioreclamo", //obligatorio si cobradaenfecha === false
    ];

    // Validar campos requeridos generales
    requiredFields.forEach((field) => {
      if (
        !cudBillingRecord[field] ||
        cudBillingRecord[field].toString().trim() === ""
      ) {
        newErrors[field] = `${field} es obligatorio`;
      }
    });

    // Validar nombreyapellidousuario si el perfil es "admin"
    if (
      cudBillingRecord.cobradaenfecha === true &&
      !cudBillingRecord.fechacobro
    ) {
      newErrors.fechacobro =
        "Fecha de cobro es obligatoria si cobrada en fecha es true";
    }

    // Validar idprofesional si el perfil es "profesional"
    if (
      cudBillingRecord.cobradaenfecha === false &&
      !cudBillingRecord.fechareclamo
    ) {
      newErrors.fechareclamo =
        "Fecha de reclamo es obligatoria si cobrada en fecha es false";
    }
    if (
      cudBillingRecord.cobradaenfecha === false &&
      (!cudBillingRecord.medioreclamo ||
        cudBillingRecord.medioreclamo.toString().trim() === "")
    ) {
      newErrors.medioreclamo =
        "Medio de reclamo es obligatorio si cobrada en fecha es false";
    }

    return newErrors; // Asegúrate de retornar siempre el objeto newErrors
  };

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(
          response.filter(
            (professionalRecord) => professionalRecord.activo === true
          )
        );
        if (professionalId) {
          const foundProfessionalRecord = response.find(
            (record) => record.id === parseInt(professionalId)
          );
          setProfessionalRecord(foundProfessionalRecord);
          console.log(foundProfessionalRecord);
        }
      })
      .catch((error) => console.log(error));
    getPatientsRecords()
      .then((response) => {
        const filteredResponse = response.filter(
          (patientRecord) =>
            patientRecord.cud === true && patientRecord.activo === true
        );
        setPatientsRecords(filteredResponse);
        if (patientId) {
          const foundPatientRecord = response.find(
            (record) => record.id === parseInt(patientId)
          );
          setPatientRecord(foundPatientRecord);
          console.log(foundPatientRecord);
        }
      })
      .catch((error) => console.log(error));
  }, [setPageIsLoading, patientId, professionalId]);

  if (!professionalsRecords || !patientsRecords) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedCudBillingRecord = { ...cudBillingRecord, [name]: value };
    if (name === "montopercibido") {
      updatedCudBillingRecord.retencion =
        updatedCudBillingRecord.montopercibido * 0.35;
      updatedCudBillingRecord.montofinalprofesional =
        updatedCudBillingRecord.montopercibido * 0.65;
      console.log(updatedCudBillingRecord.retencion);
    }
    if (value2 && name === "idprofesional") {
      updatedCudBillingRecord.nombreyapellidoprofesional = value2;
    }

    if (
      professionalId &&
      !updatedCudBillingRecord.idprofesional &&
      !updatedCudBillingRecord.nombreyapellidoprofesional
    ) {
      updatedCudBillingRecord.idprofesional = professionalRecord.id;
      updatedCudBillingRecord.nombreyapellidoprofesional =
        professionalRecord.nombreyapellidoprofesional;
    }

    if (
      patientId &&
      !updatedCudBillingRecord.idpaciente &&
      !updatedCudBillingRecord.nombreyapellidopaciente
    ) {
      updatedCudBillingRecord.idpaciente = patientRecord.id;
      updatedCudBillingRecord.nombreyapellidopaciente =
        patientRecord.nombreyapellidopaciente;
      updatedCudBillingRecord.obrasocialpaciente =
        patientRecord.obrasocialpaciente;
    }

    if (value2 && name === "idpaciente") {
      updatedCudBillingRecord.nombreyapellidopaciente = value2;
      try {
        const response = await getPatientRecord(value);
        updatedCudBillingRecord.obrasocialpaciente =
          response.obrasocialpaciente;
      } catch (error) {
        console.log(error);
      }
    }
    setCudBillingRecord(updatedCudBillingRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedCudBillingRecord);
    // console.log(modified);
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(cudBillingRecord);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Asumiendo que setErrors actualiza el estado de los errores
      WarningAlert("Verificar los campos incompletos ❌");
      return;
    }
    setIsLoading(true);
    createCudBillingRecord(cudBillingRecord)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const professionalList = createList(
    professionalsRecords,
    "nombreyapellidoprofesional",
    "id",
    false,
    "nombreyapellidoprofesional"
  );

  const patientsList = createList(
    patientsRecords,
    "nombreyapellidopaciente",
    "id",
    false,
    "nombreyapellidopaciente"
  );

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: professionalId
      ? professionalRecord.nombreyapellidoprofesional
      : "Selecc. Profesional",
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: patientId
      ? patientRecord.nombreyapellidopaciente
      : "Selecc. Paciente",
  };

  const createCudBillingProps = {
    handleChange,
    handleSubmit,
    isLoading,
    cancelAction,
    goBackAction,
    professionalsProps,
    patientsProps,
    modifiedFlag,
    cobradaenfecha: cudBillingRecord.cobradaenfecha,
    cudBillingRecord,
    modified,
    setPageIsLoading,
    professionalId,
    patientId,
    professionalRecord,
    patientRecord,
    errors,
  };

  return (
    <>
      <CreateCudBilling {...createCudBillingProps} />
    </>
  );
};
