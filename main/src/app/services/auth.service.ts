import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Inventory } from '../models/inventory';
import { Customer } from '../models/customer';
import { Quote } from '../models/quote';
import { Company } from '../models/company';
import { Auth } from '../models/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = "http://localhost:5000/api/flow/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  token: string;
  constructor(private httpClient: HttpClient) { }

  getToken(): string {
    return this.token;
  }
   
  login(authData: Auth) {
    return this.httpClient.post<Auth>(this.apiServer + 'login', authData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  signup(user: User) {
    return this.httpClient.post<User>(this.apiServer + 'signup', user, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findUsername(username: string) {
    return this.httpClient.post<User>(this.apiServer + 'username', {username}, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error: any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}