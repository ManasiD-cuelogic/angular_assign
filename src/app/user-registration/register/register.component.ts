import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/form-validator/passwordMatch.validator';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  files: FileList;
  signupForm: FormGroup;
  warningMsg: string;
  flashMsg: boolean = false;

  getFiles(event) {
    this.files = event.target.files;
  }
  constructor(private frmbuilder: FormBuilder,
    private UserService: UserService,
    private route: Router) {
    this.signupForm = frmbuilder.group({
      email:['',[Validators.required,Validators.email]],
      fname: ['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/),Validators.maxLength(15),Validators.minLength(1)]],
      lname: ['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/),Validators.maxLength(15),Validators.minLength(1)]],
      profileImage: ['',[Validators.pattern(/.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i)]],
      gender: ['',Validators.required],
      address:['',[Validators.required,Validators.maxLength(25),Validators.minLength(1)]],
      password: ['',[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      cnfPassword: ['',Validators.required]
    },{ validator: ConfirmPasswordValidator.MatchPassword });
  }

  ngOnInit(): void {
  }
  registerUser(signupForm: any) {

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    const emailId = signupForm.get('email').value;
    const fname = signupForm.get('fname').value;
    const lname = signupForm.get('lname').value;
    const gender = signupForm.get('gender').value;
    const address = signupForm.get('address').value;
    const password = signupForm.get('password').value;
    const filesObj = this.files;


    const userErrorCheck: boolean = this.UserService.registerNewUser(emailId, fname, lname, gender, address, password, filesObj);

    if (userErrorCheck == false) {
      this.flashMsg = true;
      this.warningMsg = "User already exists";
      signupForm.reset();
    }
  }

  //getting signupForm(Reactive form control)
  /*get f(): any {
    console.log("hii");
    
    return this.signupForm.controls;
  }*/

}
