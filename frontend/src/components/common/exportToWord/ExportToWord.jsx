/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import ArticleIcon from "@mui/icons-material/Article";
import { format } from "date-fns";
import { age } from "../age";
import {
  PhoneHeaderText,
  adressHeaderText,
  confidentialityPolicy,
  observations,
  title1,
  titleHeaderText,
} from "./reportTexts";

import logo from "/elReinoDelReves.png";
// import { useEffect, useState } from "react";

export const ExportToWord = ({
  patient,
  records,
  reportTitle,
  enableReportButton,
}) => {
  const imagen = logo;

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImageData(reader.result); // Guardamos la imagen como Data URL (base64)
  //     };
  //     reader.readAsDataURL(file); // Leemos el archivo como base64
  //   }
  // };

  // const [imageBase64, setImageBase64] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  // const convertImageToBase64 = async (url) => {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       resolve(reader.result.replace(/^data:image\/\w+;base64,/, ""));
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // useEffect(() => {
  //   const loadImage = async () => {
  //     try {
  //       let imageBase64 = await convertImageToBase64(logo); // Usar la variable 'logo' que contiene la URL de la imagen

  //       if (!imageBase64.startsWith("data:image/png;base64,")) {
  //         imageBase64 = "data:image/png;base64," + imageBase64;
  //       }

  //       console.log("Imagen Base64:", imageBase64);
  //       // Aquí puedes usar 'imageBase64' como lo necesites

  //       setImageBase64(imageBase64);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error al convertir la imagen:", error);
  //     }
  //   };
  //   loadImage();
  // }, []);

  const generateDoc = async () => {
    // if (isLoading) {
    //   console.log("Imagen aún no cargada");
    //   return;
    // }
    try {
      const response = await fetch(logo);
      const imageBlob = await response.blob(); // Convertimos la respuesta en un blob
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      const imageUint8Array = new Uint8Array(await imageBlob.arrayBuffer());

      const docParagraphs = records.map((record) => {
        const dateRecord = format(new Date(record.fechaconsulta), "dd/MM/yyyy");

        const dateParagraph = new Paragraph({
          children: [
            new TextRun({
              text: `Fecha: ${dateRecord}`,
              font: "Arial",
              size: 24,
              bold: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360, before: 180 },
        });

        const descriptionParagraph = new Paragraph({
          children: [
            new TextRun({
              text: `${record.descripcion}`,
              font: "Arial",
              size: 24,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360 },
        });

        return [dateParagraph, descriptionParagraph];
      });

      const flattenedParagraphs = docParagraphs.flat();

      const confidentialityParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `IMPORTANTE: `,
            font: "Arial",
            size: 24,
            bold: true,
          }),
          new TextRun({
            text: `${confidentialityPolicy}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const observationsParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `OBSERVACIONES: `,
            font: "Arial",
            size: 24,
            bold: true,
          }),
          new TextRun({
            text: `${observations}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, before: 480, after: 480 },
      });

      const lineSignatureParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `_____________________`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 1500, after: 180 },
      });

      const signatureParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `Firma Profesional`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const title = new Paragraph({
        children: [
          new TextRun({
            text: `${title1}`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const patientData = [
        {
          label: "Nombre y Apellido: ",
          value: patient.nombreyapellidopaciente,
        },
        {
          label: "Edad: ",
          value: age(patient.fechanacimientopaciente),
        },
        {
          label: "Fecha de Nacimiento: ",
          value: format(
            new Date(patient.fechanacimientopaciente),
            "dd/MM/yyyy"
          ),
        },
        { label: "Diagnóstico Previo: ", value: patient.diagnosticoprevio },
        { label: "Obra Social: ", value: patient.obrasocialpaciente },
        { label: "Nro. Afiliado: ", value: patient.nroafiliadopaciente },
        { label: "DNI: ", value: patient.dnipaciente },
        {
          label: "Profesional: ",
          value: reportTitle.nombreyapellidoprofesional,
        },
        {
          label: "Especialidad: ",
          value: reportTitle.especialidadprofesional,
        },
        { label: "Matrícula: ", value: reportTitle.matriculaprofesional },
        { label: "CUIT: ", value: reportTitle.cuitprofesional },
        {
          label: "Período de Abordaje: ",
          value: reportTitle.periodoabordaje,
        },
      ];

      console.log(reportTitle);

      const patientDataList = patientData.map((data) => {
        return new Paragraph({
          bullet: {
            level: 0,
            type: "bullet",
          },
          children: [
            new TextRun({
              text: `${data.label}`,
              font: "Arial",
              size: 24,
              bold: true,
            }),
            new TextRun({
              text: `${data.value}`,
              font: "Arial",
              size: 24,
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { line: 360 },
        });
      });

      const today = format(new Date(), "dd/MM/yyyy");

      const todayParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `Rosario ${today}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { line: 360, before: 180 },
      });

      const doc = new Document({
        sections: [
          {
            headers: {
              default: new Header({
                children: [
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE,
                    },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new ImageRun({
                                    data: imageBlob,
                                    transformation: {
                                      width: 100,
                                      height: 100,
                                    },
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              left: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              right: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              bottom: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "000000",
                              },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${titleHeaderText}`,
                                    font: "Arial",
                                    size: 32,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${adressHeaderText}`,
                                    font: "Arial",
                                    size: 24,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${PhoneHeaderText}`,
                                    font: "Arial",
                                    size: 24,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                            verticalAlign: "center",
                            borders: {
                              top: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              left: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              right: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              bottom: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "000000",
                              },
                            },
                          }),
                        ],
                      }),
                    ],
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.SINGLE,
                        size: 12,
                        color: "000000",
                      },
                    },
                  }),
                ],
              }),
            },
            children: [
              todayParagraph,
              confidentialityParagraph,
              ...patientDataList,
              title,
              ...flattenedParagraphs,
              observationsParagraph,
              lineSignatureParagraph,
              signatureParagraph,
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const filename = `Informe ${
        patient.nombreyapellidopaciente
      } ${new Date().toLocaleDateString()}.docx`;
      saveAs(blob, filename);
      return "Informe generado exitosamente";
    } catch (error) {
      console.log("Error al generar informe: ", error);
      throw error;
    }
  };

  return (
    <Button
      onClick={() =>
        generateDoc()
          .then((response) => {
            console.log(response);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Informe generado exitosamente",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Error al generar informe",
            });
          })
      }
      variant="contained"
      startIcon={<ArticleIcon />}
      disabled={!enableReportButton}
    >
      Generar Informe
    </Button>
  );
};
