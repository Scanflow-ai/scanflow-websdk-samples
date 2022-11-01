import { Component, OnInit, ViewChild } from '@angular/core';
import { PostServiceService } from './post-service.service';
import * as ScanflowSDK from 'scanflow_websdk_demo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Scanflow Demo App';
  devices: any = [];
  modes: any = [];
  private postService: PostServiceService;
  displayStyle = 'none';
  capturedData = {};

  constructor() {
    this.postService = new PostServiceService();
  }

  ngOnInit(): void {
    ScanflowSDK.configureSDK(environment.licenseKey, environment.domainName)
      .then((res) => {
        const iDCaptureObj = new ScanflowSDK.IDCapture();
        const cardsList = iDCaptureObj.getCardTypes();
        const rootElement = document.getElementById('camera_view')!;
        const configuration = {
          captureMode: 'auto',
          cardType: cardsList[0],
        };
        const captureObj = new ScanflowSDK.CaptureView(
          rootElement,
          configuration
        );
        captureObj.getMediaDevices().then((res) => {
          this.devices = res;
          console.log(res);
        });

        const eventEmitter = iDCaptureObj.addListener();
        eventEmitter.on('getData', (data) => {
          const dialog = document.getElementById('dialogBox') as HTMLElement;
          dialog.style.display = 'block';
          this.capturedData = data;
          console.log(data);
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
