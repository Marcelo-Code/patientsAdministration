/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

export const CudBillingListShowTable = ({ record, trimUrl }) => {
  return (
    <>
      <td style={{ padding: "20px" }}>{record.nombreyapellidoprofesional}</td>
      <td style={{ padding: "20px" }}>{record.prestacion}</td>
      <td style={{ padding: "20px" }}>{record.nombreyapellidopaciente}</td>
      <td>
        {record.imgasistenciamensual === "" ? (
          // <div>No hay archivo cargado</div>
          <ClearIcon />
        ) : (
          <Link
            to={`${record.imgasistenciamensual}`}
            onClick={(e) => {
              e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
              window.open(record.imgasistenciamensual, "_blank"); // Abrir la URL en una nueva pestaña
            }}
          >
            {trimUrl(record.imgasistenciamensual)}
          </Link>
        )}
      </td>
      <td>
        {record.documentoinformemensual === "" ? (
          <ClearIcon />
        ) : (
          // <div>No hay archivo cargado</div>
          <Link
            to={`${record.documentoinformemensual}`}
            onClick={(e) => {
              e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
              window.open(record.documentoinformemensual, "_blank"); // Abrir la URL en una nueva pestaña
            }}
          >
            {trimUrl(record.documentoinformemensual)}
          </Link>
        )}
      </td>
      <td>
        {record.documentofacturamensual === "" ? (
          <ClearIcon />
        ) : (
          // <div>No hay archivo cargado</div>
          <Link
            to={`${record.documentofacturamensual}`}
            onClick={(e) => {
              e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
              window.open(record.documentofacturamensual, "_blank"); // Abrir la URL en una nueva pestaña
            }}
          >
            {trimUrl(record.documentofacturamensual)}
          </Link>
        )}
        {/* {record.documentofacturamensual} */}
      </td>
      <td>{record.obrasocialpaciente}</td>
      <td>
        {new Date(record.periodofacturado)
          .toLocaleDateString("es-AR", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })
          .replace(" de ", " ")}
      </td>
      <td>{record.nrofactura}</td>
      <td>
        {record.montopercibido !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.montofacturado)}
      </td>
      <td>
        {new Date(record.fechapresentacionos).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })}
      </td>
      <td>
        {new Date(record.fecharecepcionos).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })}
      </td>
      <td>{record.cobradaenfecha ? "Si" : "No"}</td>
      <td>
        {record.fechareclamo
          ? new Date(record.fechareclamo).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "UTC",
            })
          : "Sin reclamo"}
      </td>
      <td>{record.fechareclamo ? record.medioreclamo : "Sin reclamo"}</td>
      <td>{record.fechareclamo ? record.respuestareclamo : "Sin reclamo"}</td>
      <td>
        {record.fechacobro
          ? new Date(record.fechacobro).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "UTC",
            })
          : "Sin fecha"}
      </td>
      <td>
        {record.montopercibido !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.montopercibido)}
      </td>
      <td>
        {record.montopercibido !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.retencion)}
      </td>
      <td>
        {record.montopercibido !== undefined &&
          new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(record.montofinalprofesional)}
      </td>
    </>
  );
};

export default CudBillingListShowTable;
