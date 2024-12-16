/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
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
  adressHeaderText,
  confidentialityPolicy,
  observations,
  title1,
  titleHeaderText,
} from "./reportTexts";

import logo from "/elReinoDelReves.jpg";
import { ErrorAlert, SuccessAlert } from "../alerts/alerts";

export const ExportToWord = ({
  patient,
  records,
  reportTitle,
  enableReportButton,
}) => {
  const generateDoc = async () => {
    try {
      const response = await fetch(logo);
      const imageBlob = await response.blob();
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
                                spacing: { after: 10 },
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
                                size: 20,
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
                                    size: 17,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: { line: 240, before: 300, after: 10 },
                              }),
                            ],
                            verticalAlign: "bottom",
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
                                size: 20,
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
                        size: 20,
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
            SuccessAlert("¡Informe generado exitosamente!");
          })
          .catch((error) => {
            ErrorAlert("Error al generar informe");
            console.log(error);
          })
      }
      variant="contained"
      startIcon={<ArticleIcon />}
      disabled={!enableReportButton}
      size="small"
    >
      Generar Informe
    </Button>
  );
};
