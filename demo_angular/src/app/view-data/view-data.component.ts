import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
})
export class ViewDataComponent implements OnInit {
  dialog!: MatDialogRef<ViewDataComponent>;
  @Input() displayStyle = 'none';
  @Input() userData!: any;
  constructor() {}

  ngOnInit(): void {}
  closeDialog = () => {
    const dialog = document.getElementById('dialogBox') as HTMLElement;
    dialog.style.display = this.displayStyle;
  };
}
