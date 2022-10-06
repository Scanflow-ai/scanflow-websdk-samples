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
} from "@mui/material";

const licenseKey = environment.LICENSE_KEY;
const App = () => {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = React.useState("");
  const [rerender, setRerender] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Created Package with Test License Key
    ScanflowSDK.configureSDK(licenseKey)
      .then(async (res) => {
        const rootElement = document.getElementById("camera_view");
        const captureObj = new ScanflowSDK.CaptureView(rootElement);
        const devices = await captureObj.getMediaDevices();
        setDevices([...devices]);
        const eventEmitter = new ScanflowSDK.IDCapture().addListener();
        eventEmitter.on("getData", (data) => {
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
    console.log(constraints);
    const rootElement = document.getElementById("camera_view");
    new ScanflowSDK.CaptureView(rootElement, constraints);
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
                  sx={{ ml: 1, width: "fit-content", textAlign: "center" }}
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
                AadharCard Capture
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0, mr: 4 }}>
              <Typography
                variant="h6"
                color="white"
                className="d-inline nav-link"
              >
                <a
                  href={
                    "https://github.com/Scanflow-ai/scanflow-websdk-samples"
                  }
                  target="_blank"
                  className="nav-link"
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

export default App;
