import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  userValid : boolean = false;
  constructor(private router:Router,
    private afs : AngularFirestore,
    ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   const auth = this.afs.collection('auth');
    //   auth.doc('0Bp2KfpGJGMTaRpXqlGO').valueChanges().pipe().subscribe((res:any) => {
    //     console.log("changes get", res.userValid);
    //     this.userValid = res.userValid
    //   })
    //   // const userToken = localStorage.getItem('PACtoken')
      // if (this.userValid) {
        // console.log("not allow to go");
        // this.router.navigate(['/auth/login'])
      //   return false
      // } else {
      //   this.router.navigate(['/case'])
        return true
      // }

  }
  
}
