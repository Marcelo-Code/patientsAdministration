/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

export const NoCudBillingListShowTable = ({ record, trimUrl }) => {
  return (
    <>
      <td style={{ padding: "20px" }}>{record.nombreyapellidoprofesional}</td>
      <td style={{ padding: "20px" }}>{record.prestacion}</td>
      <td style={{ padding: "20px" }}>{record.nombreyapellidopaciente}</td>
      <td>{record.modopago}</td>
      <td>{record.mediopago}</td>
      <td>{record.destinatariopago}</td>
      <td>
        {record.montosesion !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.montosesion)}
      </td>
      <td>
        {record.retencion !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.retencion)}
      </td>
      <td>
        {record.montofinalprofesional !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.montofinalprofesional)}
      </td>
      <td>
        {new Date(record.fechadepago).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td>{record.destinatario}</td>
      <td>{record.pacienteadeuda ? "Si" : "No"}</td>
      <td>
        {record.pacienteadeuda
          ? new Date(record.fechadeuda).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Sin fecha"}
      </td>
      <td>
        {record.pacienteadeuda
          ? record.pagomontoadeudado
            ? "Si"
            : "No"
          : "No hay deuda"}
      </td>
      <td>
        {record.fechapagomontoadeudado
          ? new Date(record.fechapagomontoadeudado).toLocaleDateString(
              "es-AR",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            )
          : "Sin fecha"}
      </td>
      <td>
        {record.documentofactura === "" ? (
          // <div>No hay archivo cargado</div>
          <ClearIcon />
        ) : (
          <Link
            to={`${record.documentofactura}`}
            onClick={(e) => {
              e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
              window.open(record.documentofactura, "_blank"); // Abrir la URL en una nueva pestaña
            }}
          >
            {trimUrl(record.documentofactura)}
          </Link>
        )}
      </td>
      <td>
        {record.documentocomprobantepagoretencion === "" ? (
          <ClearIcon />
        ) : (
          <Link
            to={`${record.documentocomprobantepagoretencion}`}
            onClick={(e) => {
              e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
              window.open(record.documentocomprobantepagoretencion, "_blank"); // Abrir la URL en una nueva pestaña
            }}
          >
            {trimUrl(record.documentocomprobantepagoretencion)}
          </Link>
        )}
      </td>
    </>
  );
};
