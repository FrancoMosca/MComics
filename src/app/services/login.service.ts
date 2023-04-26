import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from './firestore-code-error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  userLogin: FormGroup;
  isLoggedIn: Boolean = false;
  loading: boolean = false;
  constructor(
              private router: Router,
              private auth: Auth,              
              private toastr: ToastrService,
              private firebaseError: FirebaseCodeErrorService,
              public fb:FormBuilder,
              ){

    this.userLogin = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;

    this.loading =true;
    signInWithEmailAndPassword(this.auth,email,password).then((user)=>{
      this.router.navigate(['/dashboard']);
      this.isLoggedIn=true;
    }).catch((error)=>{
      this.loading =false;
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code),'Error');
    });
  }

  logout(){
    signOut(this.auth).then(() => this.router.navigate(['/home']));
    this.isLoggedIn= false;
  }
  

  onClick() {
    authState(this.auth).subscribe(user =>{
      if (user) {  
        console.log('El usuario está autenticado');
        this.isLoggedIn = true;
        this.router.navigate(['/shopping-cart']);
      } else {
        console.log('El usuario no está autenticado');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.logout();
  }
}
