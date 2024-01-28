import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confrimation-dialog',
  templateUrl: './confrimation-dialog.component.html',
  styleUrls: ['./confrimation-dialog.component.scss']
})
export class ConfrimationDialogComponent implements OnInit {

  constructor(
    public _matDialogRef: MatDialogRef<ConfrimationDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
