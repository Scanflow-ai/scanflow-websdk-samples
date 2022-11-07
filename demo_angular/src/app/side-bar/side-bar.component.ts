import { Component, OnInit } from '@angular/core';
import * as ScanflowSDK from 'scanflow_websdk';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  cardsList: string[] = [];
  constructor() {
    this.cardsList = new ScanflowSDK.IDCapture().getCardTypes();
  }

  ngOnInit(): void {}
  closePreset = () => {
    const preset = document.getElementById('preset') as HTMLElement;
    preset.style.display = 'none';
  };
}
