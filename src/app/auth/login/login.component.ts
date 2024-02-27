import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form! : FormGroup;
  authUser:any;
  constructor(
    private afs : AngularFirestore,
    private _messageBar: MatSnackBar,
    private _router : Router,
    private _fb :FormBuilder
  ) { 
    this.form = this._fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {

    const auth = this.afs.collection('auth');
    auth.doc('0Bp2KfpGJGMTaRpXqlGO').valueChanges().pipe(take(1)).subscribe((res) => {
      console.log("changes get", res);
      this.authUser = res;
    })

  }

  onSubmit(){
    console.log("form", this.form.value);
    if(this.userValid()){
      localStorage.setItem('PACtoken', 'jjshbdjsdfjsdfjskdhfjsdfsjdf');
      this._router.navigate(['/case/database/list']);
      this._messageBar.open('Login Successful', 'OKAY', {duration : 3000});
    }else{
      localStorage.clear();
      this._messageBar.open('Failed to login! email password incorrect', 'OKAY', {duration : 3000});
    }
  }

  userValid() {
    if(!this.authUser) return false;
    if(this.authUser.email === this.form.get('email')?.value && this.authUser.password === this.form.get('password')?.value){
      const payload = {
        userValid : true
      }
      const auth = this.afs.collection('auth').doc('0Bp2KfpGJGMTaRpXqlGO')
      auth.update(payload);
      return true;
    }else{
      const payload = {
        userValid : false
      }
      const auth = this.afs.collection('auth').doc('0Bp2KfpGJGMTaRpXqlGO')
      auth.update(payload);
      return false;
    }

  }

  


}
