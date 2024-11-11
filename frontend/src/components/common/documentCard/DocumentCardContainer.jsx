import { DocumentCard } from "./DocumentCard";
import { documentData } from "./documentData";
import "./documentCard.css";

export const DocumentCardContainer = () => {
  return (
    <div className="documentCardContainer">
      <h2
        style={{
          textAlign: "center",
          width: "100%",
          margin: "10px",
          paddingBottom: "10px",
          borderBottom: "2px solid black",
        }}
      >
        Documentación
      </h2>
      {documentData.map((document, index) => (
        <DocumentCard key={index} button={document.button} />
      ))}
    </div>
  );
};
