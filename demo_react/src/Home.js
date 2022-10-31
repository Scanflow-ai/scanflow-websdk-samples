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
} from "@mui/material";

const licenseKey = environment.LICENSE_KEY;
const Home = () => {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = React.useState("");
  const [rerender, setRerender] = useState(false);
  const [data, setData] = useState([]);
  const [modes, setModes] = useState([]);
  const [mode, setCaptureMode] = useState("");
  const [checked, setChecked] = React.useState(true);
  useEffect(() => {
    // Created Package with Test License Key
    ScanflowSDK.configureSDK(licenseKey)
      .then(async (res) => {
        const idDataObj = new ScanflowSDK.IDCapture();
        const modes = idDataObj.getcaptureModeData();
        setModes([...modes]);
        const configuration = {
          captureMode: "auto",
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
          console.log(data);
          setData([data]);
          handleClickOpen();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rerender]);
  const changeDevices = (event) => {
    const constraints = {
      deviceId: event.target.value,
    };
    const configuration = {
      licenseKey,
      captureMode: mode.trim().length > 0 ? "auto" : "manual",
    };
    console.log(constraints);
    const rootElement = document.getElementById("camera_view");
    new ScanflowSDK.CaptureView(rootElement, configuration, constraints);
  };
  const changeCaptureMode = (event) => {
    const modeOfCapture = event.target.checked ? modes[0] : modes[1];
    setCaptureMode(modeOfCapture);
    setChecked(event.target.checked);
    const constraints = {
      deviceId: deviceId,
    };
    const configuration = {
      licenseKey,
      captureMode: modeOfCapture,
    };
    console.log(configuration);
    const rootElement = document.getElementById("camera_view");
    new ScanflowSDK.CaptureView(rootElement, configuration, constraints);
  };
  const [open, setOpen] = React.useState(false);

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
              {modes ? (
                <>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    Mode
                  </Typography>
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
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Video_camera_icon.svg/2048px-Video_camera_icon.svg.png"
                }
                height={50}
                width={50}
                alt={"camera"}
              />
              {devices ? (
                <FormControl
                  sx={{
                    ml: 1,
                    width: "fit-content",
                    textAlign: "center",
                    height: "fit-content",
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
            </Box>

            <Box
              sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}
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
              >
                Aadhar Card Capture
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0, mr: 4 }}>
              <Typography variant="h6" color="white">
                <a
                  href={"/docs"}
                  target="_blank"
                  className="nav-link d-inline mr-2"
                >
                  Docs
                </a>
                <a
                  href={
                    "https://github.com/Scanflow-ai/scanflow-websdk-samples"
                  }
                  target="_blank"
                  className="nav-link d-inline m-2"
                >
                  Demo Code
                </a>
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
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
