import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firestore-code-error.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUser: FormGroup;
  loading: boolean = false;
  
  constructor(private fb:FormBuilder,private afAuth: Auth ,private toastr: ToastrService,private router: Router,private firebaseError:FirebaseCodeErrorService){
    this.registerUser = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      repeatPassword:['',Validators.required],
    })
  }
  ngOnInit(): void{}

  register(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    if (password != repeatPassword){
      this.toastr.error(
        'Las contraseñas no coinciden',
        'Error'
        );
      return;
    }

    this.loading =true;
    createUserWithEmailAndPassword(this.afAuth,email, password)
    .then(()=> {
      this.loading =false;
      this.toastr.success('El usuario se registro con exito','Usuario registrado');
      this.router.navigate(['/dashboard']);
      return [email,password];
    }).catch((error)=>{
      this.loading =false;
      this.toastr.error(this.firebaseError.codeError(error.code),'Error');
    })
  }
}
