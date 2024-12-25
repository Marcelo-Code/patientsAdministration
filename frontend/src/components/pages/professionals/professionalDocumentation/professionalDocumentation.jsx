import { Button, Card, CardActions } from "@mui/material";
import { Android12Switch } from "../../../common/switchEditionMode/SwitchEditionMode";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const ProfessionalDocumentation = ({
  professionalRecord,
  handleGoBack,
  documentData,
  handleEditModeChange,
  editMode,
}) => {
  return (
    <div className="documentCardContainer">
      <div
        style={{
          fontFamily: "Arial",
          fontSize: "1.2em",
          position: "sticky",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
          boxShadow: "0 0 10px black",
          padding: "10px",
        }}
      >
        <span style={{ color: "gray", padding: "10px" }}>
          Edición
          <Android12Switch
            checked={editMode}
            onChange={handleEditModeChange}
            sx={{ transform: "scale(1.3)" }}
          />
        </span>
        <Button sx={{ width: "80%" }} onClick={handleGoBack}>
          Volver
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {documentData.map((document, index) => (
          <Card
            sx={{
              width: "200px",
              height: "150px",
              textAlign: "center",
              // fontSize: "1.2em",
              color: "text.secondary",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <h3>{document.title}</h3>

            <CardActions
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {editMode && (
                <div>
                  <Link>
                    <DeleteIcon sx={{ fontSize: "2em", margin: "10px" }} />
                  </Link>
                  <Link>
                    <UploadIcon sx={{ fontSize: "2em", margin: "10px" }} />
                  </Link>
                </div>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
