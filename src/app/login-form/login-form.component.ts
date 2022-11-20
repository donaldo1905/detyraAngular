import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService, UserModel } from '../users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
usersList: UserModel[] = [];
login: boolean = true;
admin: boolean = false;
loginForm!: FormGroup;
signUpForm!: FormGroup;
adminForm!: FormGroup;
errorMessageLogin: string = '';
errorMessageSignup: string = '';
errorMessageAdmin: string = '';
constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {}
ngOnInit(): void {
this.loginForm = new FormGroup({
'usersEmail': new FormControl(null, [Validators.required, Validators.email]),
'usersPassword': new FormControl(null, [Validators.required, Validators.minLength(8)])
})
this.signUpForm = new FormGroup({
'fname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
'lname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
'newEmail': new FormControl(null, [Validators.required, Validators.email]),
'newPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
})
this.adminForm = new FormGroup({
'adminEmail': new FormControl(null, [Validators.required, Validators.email]),
'adminPassword': new FormControl(null, [Validators.required, Validators.minLength(8)])
})
  }
  onSubmitLogIn(){
    const newEmail = this.loginForm.get('usersEmail')?.value
    const newPassword = this.loginForm.get('usersPassword')?.value
    this.authService.login(newEmail, newPassword).subscribe((data) => {
    this.router.navigate(['/list'])},
    error => {this.errorMessageLogin = error}
    )
  }

  onSubmitSignUp(){
   const newEmail = this.signUpForm.get('newEmail')?.value
   const newPassword = this.signUpForm.get('newPassword')?.value
   this.authService.signUp(newEmail, newPassword).subscribe(data => 
    {
      let newUser: UserModel = {fname: this.signUpForm.get('fname')?.value, lname: this.signUpForm.get('lname')?.value, email: this.signUpForm.get('newEmail')?.value, shopList: []}
  this.usersService.addUser(newUser).subscribe() 
this.signUpForm.reset()},
   error => {this.errorMessageSignup = error}
   )
    }
  

  onSubmitAdmin(){
    const newEmail = this.adminForm.get('adminEmail')?.value
    const newPassword = this.adminForm.get('adminPassword')?.value
    this.authService.login(newEmail, newPassword).subscribe((data) => {
    this.router.navigate(['/admin'])},
    error => {this.errorMessageAdmin = error}
    )
  }
}
