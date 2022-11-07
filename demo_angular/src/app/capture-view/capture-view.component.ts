import { Component, OnInit } from '@angular/core';
import * as ScanflowSDK from 'scanflow_websdk';
import { environment } from 'src/environments/environment';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-capture-view',
  templateUrl: './capture-view.component.html',
  styleUrls: ['./capture-view.component.css'],
})
export class CaptureViewComponent implements OnInit {
  ngOnInit(): void {}
}
