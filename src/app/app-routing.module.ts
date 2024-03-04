import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'case' },
  

  { 
    path : 'not-found',
    component : PageNotFoundComponent
  },

  {
    path : 'auth',
    children : [
      {
        path : '',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)  
      },
      // {
      //   path : 'forgot-password',
      //   loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      // }
    ]
  },


  {
    path : 'case',
    // canActivate:[AuthGuardGuard],
    children : [
        {path : '', loadChildren: () => import('./case/case.module').then(m => m.CaseModule)}
    ]
  },

  { path: '**', pathMatch: 'full',  
        component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
