/* eslint-disable react/prop-types */
import { Button, Card, CardActions, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";

export const DocumentCard = ({ button }) => {
  const buttonStyle = {
    marginTop: "10px",
    height: "2.5em",
    minWidth: "100px",
    width: "100%",
    "@media (max-width: 800px)": {
      width: "100%",
      minWidth: "300px",
    },
  };
  return (
    <Card
      sx={{
        width: "300px",
        color: "text.secondary",
      }}
    >
      <Skeleton
        variant="text"
        sx={{
          width: "290px",
          height: "250px",
          margin: "auto",
        }}
      />
      <CardActions>
        <Link
          style={{
            width: "100%",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Button
            size="small"
            sx={buttonStyle}
            variant="contained"
            startIcon={<UploadIcon />}
          >
            {button}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
