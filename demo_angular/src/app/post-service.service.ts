import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  modes: any[];
  constructor() {
    this.modes = [];
  }
  setModesList = (modesList: string[]) => {
    this.modes.push(...modesList);
  };
  getModesList = () => {
    console.log(this.modes);
    return this.modes;
  };
}
