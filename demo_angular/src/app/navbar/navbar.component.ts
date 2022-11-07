import { Component, Input, OnInit } from '@angular/core';
import * as ScanflowSDK from 'scanflow_websdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() devices: any;
  modes: any[];
  selectedMode: string = '';
  selected: boolean = false;
  constructor() {
    this.modes = [];
  }

  ngOnInit(): void {
    const iDCaptureObj = new ScanflowSDK.IDCapture();
    const modesList = iDCaptureObj.getcaptureModeData();
    this.modes.push(...modesList);
    this.selectedMode = this.modes[0];
    console.log(this.selectedMode);
  }
  changeMode = () => {
    this.selected = !this.selected;
    this.selectedMode = this.selected ? this.modes[0] : this.modes[1];
    console.log(this.selectedMode);
    this.changeCapture();
  };

  changeCapture = () => {
    try {
      ScanflowSDK.configureSDK(environment.licenseKey, environment.domainName)
        .then((res: any) => {
          const iDCaptureObj = new ScanflowSDK.IDCapture();
          const cardsList = iDCaptureObj.getCardTypes();
          const rootElement = document.getElementById('camera_view')!;
          const configuration = {
            captureMode: !this.selected ? this.modes[0] : this.modes[1],
            cardType: cardsList[1],
          };
          const captureObj = new ScanflowSDK.CaptureView(
            rootElement,
            configuration
          );
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  openNav = () => {
    const preset = document.getElementById('preset') as HTMLElement;
    preset.style.display = 'block';
  };
}
