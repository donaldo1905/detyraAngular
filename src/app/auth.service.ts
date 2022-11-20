import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './login-form/user.model';

interface AuthResponseData{
idToken:	string,
email:	string,	
refreshToken:	string,	
expiresIn:	string,	
localId:	string,
registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

currentUserEmail!: string;
  constructor(private http: HttpClient, private router: Router) { }
  signUp(email: string, password: string):Observable<AuthResponseData>{
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCv1ste_Evnvj0XCdZAuMG8KNIXYxh1fow', 
  {
    email: email,
    password: password,
    returnSecureToken: true
  }).pipe(catchError(this.handleError), tap(resData => {
    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  }))
  }

  login(email: string, password: string){
    this.currentUserEmail = email
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCv1ste_Evnvj0XCdZAuMG8KNIXYxh1fow',{
      email: email,
    password: password,
    returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData =>{
    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}))
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
    const user = new User(email, userId, token, expirationDate)
    localStorage.setItem('userData', JSON.stringify(user)) 
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An error occured!'
    if(!errorRes.error || !errorRes.error.error){
    return throwError(errorMessage)}
  
  switch(errorRes.error.error.message){
case 'EMAIL_EXISTS':
  errorMessage = 'This Email already exists!'
  break
  case 'EMAIL_NOT_FOUND':
  errorMessage = 'This Email does not exist!'
  break
  case 'INVALID_PASSWORD':
  errorMessage = 'This password is not correct!'
  break
  }
return throwError(errorMessage)}

logOut(){
  this.router.navigate(['/login']);
  localStorage.clear();
}

  }