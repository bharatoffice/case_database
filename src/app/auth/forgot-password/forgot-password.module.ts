import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [

  // { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    component : ForgotPasswordComponent
  }
]

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ForgotPasswordModule { }
