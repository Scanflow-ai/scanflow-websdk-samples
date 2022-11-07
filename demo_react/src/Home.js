/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import * as ScanflowSDK from "scanflow_websdk_demo";
import environment from "./environment/environment";
import Container from "@mui/material/Container";
import SFIDCapture from "./SFIDCapture";
import SFSideBar from "./SFSideBar";
import {
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Box,
  AppBar,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import SFCardType from "./SFCardType";
import SFErrorDisplay from "./SFErrorDisplay";

const licenseKey = environment.LICENSE_KEY;
const domainName = environment.DOMAIN_NAME;
const Home = () => {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = React.useState("");
  const [rerender, setRerender] = useState(false);
  const [data, setData] = useState([]);
  const [modes, setModes] = useState([]);
  const [mode, setCaptureMode] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [cardPreset, setCardPreset] = useState("");
  const [cardsList, setCardsList] = useState([]);
  const [togglePreset, setTogglePreset] = useState(false);
  const [error, setErrorResponse] = useState("");

  useEffect(() => {
    // Created Package with Test License Key
    const idDataObj = new ScanflowSDK.IDCapture();
    const listOfCards = idDataObj.getCardTypes();
    setCardsList([...listOfCards]);
    const modes = idDataObj.getcaptureModeData();
    setModes([...modes]);
    ScanflowSDK.configureSDK(licenseKey, domainName)
      .then(async (res) => {
        const configuration = {
          captureMode: "auto",
          cardType: listOfCards[0],
        };
        const rootElement = document.getElementById("camera_view");
        const captureObj = new ScanflowSDK.CaptureView(
          rootElement,
          configuration
        );
        const devices = await captureObj.getMediaDevices();
        setDevices([...devices]);
        const eventEmitter = idDataObj.addListener();
        eventEmitter.on("getData", (data) => {
          setData([data]);
          handleClickOpen();
        });
      })
      .catch((err) => {
        if (err?.response?.data.detail) {
          setErrorResponse(err?.response?.data.detail);
        } else if (err?.message) {
          setErrorResponse(err?.message);
        } else {
          console.log(err);
        }
      });
  }, [rerender]);
  const changeDevices = (event) => {
    try {
      const constraints = {
        deviceId: event.target.value,
      };
      ScanflowSDK.configureSDK(licenseKey, domainName)
        .then(async (res) => {
          setModes([...modes]);
          const configuration = {
            licenseKey,
            captureMode: mode.trim().length > 0 ? "auto" : "manual",
            cardType: cardPreset.trim().length > 0 ? cardPreset : cardsList[0],
          };
          const rootElement = document.getElementById("camera_view");
          new ScanflowSDK.CaptureView(rootElement, configuration, constraints);
        })
        .catch((err) => {
          if (err?.response?.data.detail) {
            setErrorResponse(err?.response?.data.detail);
          } else if (err?.message) {
            setErrorResponse(err?.message);
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const changeCaptureMode = (event) => {
    try {
      const modeOfCapture = event.target.checked ? modes[0] : modes[1];
      setCaptureMode(modeOfCapture);
      setChecked(event.target.checked);
      const constraints = {
        deviceId: deviceId,
      };
      ScanflowSDK.configureSDK(licenseKey, domainName)
        .then(async (res) => {
          setModes([...modes]);
          const configuration = {
            licenseKey,
            captureMode: modeOfCapture,
            cardType: cardPreset.trim().length > 0 ? cardPreset : cardsList[0],
          };
          const rootElement = document.getElementById("camera_view");
          new ScanflowSDK.CaptureView(rootElement, configuration, constraints);
        })
        .catch((err) => {
          if (err?.response?.data.detail) {
            setErrorResponse(err?.response?.data.detail);
          } else if (err?.message) {
            setErrorResponse(err?.message);
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [open, setOpen] = React.useState(false);
  const openPreset = () => {
    setTogglePreset(!togglePreset);
    document.getElementById("card_type").style.display = "block";
  };
  const setCaptureView = (cardType) => {
    try {
      setCardPreset(cardType);
      const constraints = {
        deviceId: deviceId,
      };
      ScanflowSDK.configureSDK(licenseKey, domainName)
        .then(async (res) => {
          const configuration = {
            licenseKey,
            captureMode: mode ? mode : "auto",
            cardType,
          };
          const rootElement = document.getElementById("camera_view");
          new ScanflowSDK.CaptureView(rootElement, configuration, constraints);
        })
        .catch((err) => {
          if (err?.response?.data.detail) {
            setErrorResponse(err?.response?.data.detail);
          } else if (err?.message) {
            setErrorResponse(err?.message);
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const closePreset = () => {
    setTogglePreset(!togglePreset);
    document.getElementById("card_type").style.display = "none";
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className="appBar">
          <Toolbar disableGutters>
            <Box
              sx={{
                ml: 4,
                display: { xs: "flex", md: "flex" },
                alignItems: { xl: "flex-start" },
              }}
            >
              <Button
                variant="text"
                color="inherit"
                onClick={
                  !togglePreset ? () => openPreset() : () => closePreset()
                }
              >
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ textAlign: "center" }}
                >
                  &#9776;
                </Typography>
              </Button>

              {modes ? (
                <>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ mt: 1, textAlign: "center" }}
                  ></Typography>
                  <FormControlLabel
                    value={mode}
                    control={
                      <Switch
                        checked={checked}
                        onChange={(e) => changeCaptureMode(e)}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{ textAlign: "center" }}
                        color="default"
                      />
                    }
                    label={mode === "" ? "AUTO" : mode.toUpperCase()}
                    labelPlacement="bottom"
                  />
                </>
              ) : null}
              <Container maxWidth="md">
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Video_camera_icon.svg/2048px-Video_camera_icon.svg.png"
                  }
                  height={50}
                  width={50}
                  alt={"camera"}
                  className="d-inline-block mt-2"
                />
                {devices ? (
                  <FormControl
                    sx={{
                      textAlign: "center",
                      border: "none",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Camera Type"
                      onChange={(event) => changeDevices(event)}
                      value={deviceId}
                      onClick={() => setRerender(true)}
                      sx={{ textAlign: "center" }}
                    >
                      {devices.map((e, index) => (
                        <MenuItem value={e.deviceId} key={index}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
              </Container>
            </Box>

            <Box
              sx={{ flexGrow: 3, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box
              className="d-block m-auto m-auto"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "inline",
                  fontWeight: "bolder",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                }}
                id="cardHeading"
              >
                Aadhar Card Capture
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}
            ></Box>
          </Toolbar>
        </AppBar>
      </Box>
      <SFCardType
        cardsList={cardsList}
        closePreset={closePreset}
        openPreset={openPreset}
        setCaptureView={setCaptureView}
      />
      <SFIDCapture />;
      <SFSideBar
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
        data={data}
      />
    </Container>
  );
};

export default Home;
