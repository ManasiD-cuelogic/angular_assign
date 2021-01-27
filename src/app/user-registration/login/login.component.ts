import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
export class SignUpErrorStateMatcher implements ErrorStateMatcher {
  
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm :FormGroup;
  warningMessage:string;
  flashMessage:boolean=false;
  constructor( private frmbuilder: FormBuilder,
    private UserService:UserService,
    private route:Router) { 
      this.signinForm = frmbuilder.group({
        email:['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      });
    }

  ngOnInit(): void {
  }
  loginUser(signinForm:any){
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }
    const emailId = signinForm.get('email').value;
    const password = signinForm.get('password').value;

    const loginCheck:boolean = this.UserService.loginUser(emailId,password);
    if(loginCheck == true){
      this.flashMessage=true;
      this.warningMessage="User does not exists";
      signinForm.reset();
    }else{
      this.flashMessage=true;
      this.warningMessage="Password is incorrect";
      signinForm.reset();
    }

}
  //getting signinForm(Reactive form control)
 /* get f(): any {
    console.log("hiiii");
    
    return this.signinForm.controls;
}*/
}
