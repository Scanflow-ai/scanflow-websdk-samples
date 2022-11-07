import * as React from "react";
import { Container, Typography } from "@mui/material";

export default function SFErrorDisplay(props) {
  const { response } = props;
  return (
    response && (
      <Container maxWidth="xs" className="sf_error">
        <Typography variant="h5" color="red">
          {response}
        </Typography>
      </Container>
    )
  );
}
