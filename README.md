# SCANFLOW_WEB_SDK

This library is used to support the developers in order to perform the scanning of the ID's, QRCodes and get the data to be displayed on their website with ease.

# Installation:

    To install the Scanflow WebSDK package into your project use the below installation command from your command prompt.

    Installation Command - npm install scanflow_websdk_demo (Latest Version 1.1.19)

    Demo Code Repository - https://github.com/Scanflow-ai/scanflow-websdk-samples

# Prerequisite:

Hardware Requirements:

        Full HD Web Camera -   Please use Full HD (1080p) or above resolution Web Camera for capturing the ID Card to get accurate results.

Other Requirements:

       Scanflow License Key - It is an important key to make the package work and 					get the results of the ID Card data.

# Usage

## Configuration

- For optimal performance, this configuration/initialization should be done as soon as possible in your application (even before scanning is actually required) to ensure needed components are preloaded and initialized ahead of time. The configuration function returns a promise and looks as follows

## Example

          import * as ScanflowSDK from 'scanflow_websdk_demo';
          ScanflowSDK.configureSDK('USE YOUR LICENSE KEY HERE') //important
            .then((res) => {
              const rootElement = document.getElementById("camera_view");
              const configuration = {
                captureMode: "auto", //available modes 'auto','manual'
              };
              const rootElement = document.getElementById("camera_view");
              const captureObj = new ScanflowSDK.CaptureView(
                rootElement,
                configuration
              );
              captureObj.getMediaDevices().then((res) => {
                setDevices([...res]);
              });
            })
            .catch((err) => {
              console.log(err);
            });

- The first required configuration option is a valid Scanflow license key - this is necessary for the library to work and is verified at configuration time. In order to get your license key, please contact scanflow support team.

- The “configureSDK” method needs to be imported from the package as given below and the user needs to use the valid license key in order to make the package work and get the scanned results of the ID Card (Aadhar Card). This step is an important part in the package, without the valid key the package will throw ‘Invalid License Key Error’

- On successful configuration of the package with the license key, then the user needs to create a class for the capture view as shown in the above snippet and pass the root element eg: DIV ELEMENT ID (<div id=”capture”></div>) with an optional configuration for facing mode and capture element width. It displays a camera view with a button to capture image to render view on the screen with the capture element.

  Note: This step is important and without a valid license key you can’t initialize the capture view.

- Once the card is fit with the frame and then the user needs to click the Start Capture button to capture the image and then SDK proccess it and once on successfull proccess the user needs to show the back side of the card which needs to be fit on the frame , then user can wait for proccessing by SDK and the resuslt is emitted by the emitter(getData).

- To listen to the emitter the user needs to create object for IDCapture Class then call addListener method which returns the emitter and then user needs to listen on getData emitter which returns data processed.

## Example

     const eventEmitter = new ScanflowSDK.IDCapture().addListener();
        eventEmitter.on("getData", (data) => {
          //User Will get Processed Data
          console.log(data)
        });

