/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";

const SFCardType = (props) => {
  const { cardsList, closePreset, setCaptureView } = props;
  const [cardPreset, setCardPreset] = useState('');
  const changeCardType = (event) => {
    event.preventDefault();
    document.getElementById("cardHeading").innerText =
      event.target.value + " Capture ";
    setCardPreset(event.target.value);
    setCaptureView(event.target.value);
  };
  return (
    <div className="sidenav" id="card_type">
      <Box>
        <Typography variant="h6" color="inherit" className="d-inline-block m-2">
          Preset
        </Typography>
        <Button
          variant="text"
          color="inherit"
          onClick={() => closePreset()}
          sx={{
            float: {
              sm: "right",
              md: "right",
              xl: "right",
            },
            overflow: "hidden",
          }}
        >
          <Typography variant="h6" color="inherit">
            X
          </Typography>
        </Button>
      </Box>
      <Container maxWidth="md">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={cardPreset?.trim().length > 0 ? cardPreset : 'Aadhar Card'}
            onChange={(e) => changeCardType(e)}
          >
            <FormControlLabel
              value={cardsList[0]}
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              }
              label={`${cardsList[0]}`}
            />
            <FormControlLabel
              value={cardsList[1]}
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              }
              label={`${cardsList[1]} (Beta)`}
            />
          </RadioGroup>
        </FormControl>
      </Container>
      <hr />
      <Box sx={{ flexGrow: 0, mr: 4 }}>
        <Typography variant="h6" color="white">
          <a href={"/docs"} target="_blank" className="nav-link d-block m-2">
            Docs
          </a>
          <a
            href={"https://github.com/Scanflow-ai/scanflow-websdk-samples"}
            target="_blank"
            className="nav-link d-block m-2"
          >
            Demo Code
          </a>
        </Typography>
      </Box>
    </div>
  );
};
export default SFCardType;
