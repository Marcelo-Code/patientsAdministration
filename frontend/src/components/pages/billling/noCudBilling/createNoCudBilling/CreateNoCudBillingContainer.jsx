import { useContext, useEffect, useState } from "react";

import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";
import { CreateNoCudBilling } from "./CreateNoCudBilling";
import { useParams } from "react-router-dom";
import { getProfessionalsRecords } from "../../../../../api/profesionales/professionals";
import { getPatientsRecords } from "../../../../../api/pacientes/patients";
import { createNoCudBillingRecord } from "../../../../../api/facturacionNoCud/noCudBilling";
import { WarningAlert } from "../../../../common/alerts/alerts";

export const CreateNoCudBillingContainer = () => {
  const { goBackAction, createList, cancelAction, setPageIsLoading } =
    useContext(GeneralContext);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [patientRecord, setPatientRecord] = useState(null);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { professionalId = null, patientId = null } = useParams();

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    periodofacturado: false,
    nrofactura: false,
    montofacturado: false,
    fechapresentacionos: false,
    fecharecepcionos: false,
    fechareclamo: false,
    medioreclamo: false,
    respuestareclamo: false,
    cobradaenfecha: false,
    montopercibido: false,
    retencion: false,
    montofinalprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const billRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    modopago: "",
    mediopago: "",
    destinatariopago: "",
    montosesion: 0,
    retencion: 0,
    montofinalprofesional: 0,
    fechadepago: null,
    destinatario: "",
    pacienteadeuda: false,
    fechadeuda: null,
    pagomontoadeudado: false,
    fechapagomontoadeudado: null,
    documentofactura: "",
    documentocomprobantepagoretencion: "",
  };

  const [noCudBillingRecord, setNoCudBillingRecord] = useState(
    billRecordInitialState
  );

  //Validación del formulario

  const [errors, setErrors] = useState({});

  const validateForm = (noCudBillingRecord) => {
    const newErrors = {};

    const requiredFields = [
      "idprofesional",
      "prestacion",
      "idpaciente",
      "modopago",
      "mediopago",
      "destinatariopago",
      "montosesion",
      "fechadepago",
      "destinatario",
      // "fechadeuda", // si pacienteadeuda=== true
      // "pagomontoadeudado", // si pacienteadeuda=== true
      // "fechapagomontoadeudado", // si pacienteadeuda=== true
    ];

    // Validar campos requeridos generales
    requiredFields.forEach((field) => {
      if (
        !noCudBillingRecord[field] ||
        noCudBillingRecord[field].toString().trim() === ""
      ) {
        newErrors[field] = `${field} es obligatorio`;
      }
    });

    if (
      noCudBillingRecord.pacienteadeuda === true &&
      !noCudBillingRecord.fechadeuda
    ) {
      newErrors.fechadeuda =
        "Fecha deuda es obligatorio si paciente adeuda es true ";
    }

    if (
      noCudBillingRecord.pacienteadeuda === true &&
      noCudBillingRecord.pagomontoadeudado === true &&
      !noCudBillingRecord.fechapagomontoadeudado
    ) {
      newErrors.fechapagomontoadeudado =
        "Fecha pago monto adeudado es obligatorio si pago monto adeudado es true ";
    }

    return newErrors; // Asegúrate de retornar siempre el objeto newErrors
  };

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
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
          (record) => record.cud === false
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
  }, [setPageIsLoading, professionalId, patientId]);

  if (!professionalsRecords || !patientsRecords) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedNoCudBillRecord = { ...noCudBillingRecord, [name]: value };
    if (name === "montosesion") {
      updatedNoCudBillRecord.retencion =
        updatedNoCudBillRecord.montosesion * 0.35;
      updatedNoCudBillRecord.montofinalprofesional =
        updatedNoCudBillRecord.montosesion * 0.65;
    }
    if (name === "pacienteadeuda" && !value) {
      updatedNoCudBillRecord.fechadeuda = null;
      updatedNoCudBillRecord.pagomontoadeudado = false;
      updatedNoCudBillRecord.fechapagomontoadeudado = null;
    }
    if (name === "pagomontoadeudado" && !value)
      updatedNoCudBillRecord.fechapagomontoadeudado = null;
    if (value2 && name === "idprofesional") {
      updatedNoCudBillRecord.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedNoCudBillRecord.nombreyapellidopaciente = value2;
    }
    if (
      professionalId &&
      !updatedNoCudBillRecord.idprofesional &&
      !updatedNoCudBillRecord.nombreyapellidoprofesional
    ) {
      updatedNoCudBillRecord.idprofesional = professionalRecord.id;
      updatedNoCudBillRecord.nombreyapellidoprofesional =
        professionalRecord.nombreyapellidoprofesional;
    }

    if (
      patientId &&
      !updatedNoCudBillRecord.idpaciente &&
      !updatedNoCudBillRecord.nombreyapellidopaciente
    ) {
      updatedNoCudBillRecord.idpaciente = patientRecord.id;
      updatedNoCudBillRecord.nombreyapellidopaciente =
        patientRecord.nombreyapellidopaciente;
      updatedNoCudBillRecord.obrasocialpaciente =
        patientRecord.obrasocialpaciente;
    }

    setNoCudBillingRecord(updatedNoCudBillRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedNoCudBillRecord);
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(noCudBillingRecord);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Asumiendo que setErrors actualiza el estado de los errores
      WarningAlert("Verificar los campos incompletos ❌");
      return;
    }
    setIsLoading(true);
    createNoCudBillingRecord(noCudBillingRecord)
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

  const props = {
    handleChange,
    handleSubmit,
    isLoading,
    cancelAction,
    goBackAction,
    professionalsProps,
    patientsProps,
    modifiedFlag,
    noCudBillingRecord,
    setPageIsLoading,
    professionalId,
    patientId,
    professionalRecord,
    errors,
    patientRecord,
  };

  return (
    <>
      <CreateNoCudBilling {...props} />
    </>
  );
};
