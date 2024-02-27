import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path : 'auth',
    children : [
      {
        path : '',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)  
      },
      {
        path : 'forgot-password',
        loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      }
    ]
  },


  {
    path : 'case',
    canActivate:[AuthGuardGuard],
    children : [
        {path : 'database', loadChildren: () => import('./case/case.module').then(m => m.CaseModule)}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
