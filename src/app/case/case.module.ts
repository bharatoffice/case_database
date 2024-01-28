import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './case-list.component';
import { AddUpdateCaseComponent } from './add-update-case/add-update-case.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfrimationDialogComponent } from './confrimation-dialog/confrimation-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CaseListComponent,
    AddUpdateCaseComponent,
    ConfrimationDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports : [
    CaseListComponent,
  ]
})
export class CaseModule { }
