# SCANFLOW_WEB_SDK

This library is used to support the developers in order to perform the scanning of the ID's, QRCodes and get the data to be displayed on their website with ease.

# Using this Library

This package is installed by means of `NPM (Node Package Manager)` by running the below command in the
command prompt

    `Command` - npm install scanflow_websdk

# Usage

- This library is used to support the developers in order to perform the scanning of the IDCard(Ex Aadhar Card) and to get the data to be displayed on their website with ease.

The developer needs to install this library `configures with their license key`. On successfull configuration of the license key, user needs to creates a new object for the CaptureView Class and instantiate with the `rootElement` (A HTMLDIV Element where the Camera needs to be place ) with a optional configuration for facing mode and capture element width. It displays a camera view with the overlay and a button to capture image.

## Please Note

If the License key is not configured properly it throws an `Error`

## Example

    import * as ScanflowSDK from 'scanflow_websdk';
    ScanflowSDK.configureSDK('USE YOUR LICENSE KEY HERE') //important
      .then((res) => {
        const rootElement = document.getElementById("camera_view");
        const captureObj = new ScanflowSDK.CaptureView(rootElement);
        captureObj.getMediaDevices().then((res) => {
          setDevices([...res]);
        });
      })
      .catch((err) => {
        console.log(err);
      });

- Once the card is fit with the frame and then the user needs to click the Start Capture button to capture the image and then SDK proccess it and once on successfull proccess the user needs to show the back side of the card which needs to be fit on the frame , then user can wait for proccessing by SDK and the resuslt is emitted by the emitter(getData).

- To listen to the emitter the user needs to create object for IDCapture Class then call addListener method which returns the emitter and then user needs to listen on getData emitter which returns data processed.

## Example

     const eventEmitter = new ScanflowSDK.IDCapture().addListener();
        eventEmitter.on("getData", (data) => {
          //User Will get Processed Data
          console.log(data)
        });

