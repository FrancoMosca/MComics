import { Component } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firestore-code-error.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {
  restorePassword: FormGroup;
  loading:boolean =false;
  
  constructor(private fb: FormBuilder,
              private afAuth:Auth,
              private toastr:ToastrService,
              private router:Router,
              private firebaseError:FirebaseCodeErrorService){
      this.restorePassword = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      })
  }

   restore(){
     const email = this.restorePassword.value.email;
     this.loading =true;
     sendPasswordResetEmail(this.afAuth,email).then(()=>{
       this.toastr.info('','Hemos enviado un mail para que puedas recuperar tu contraseña');
       this.router.navigate(['/login']);
    }).catch((error) => {
       this.loading =false;
       this.toastr.error(this.firebaseError.codeError(error.code),'Error');
    })
  }

}
