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
export class DataService {

  private apiServer = "http://localhost:5000/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  token: string;
  constructor(private httpClient: HttpClient) { }

 
  setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.parse(value));
  }

  getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  getAll(collection: string): Observable<User | Inventory | Quote| Company | Customer> {
    return this.httpClient.get<User | Inventory | Quote| Company | Customer>(this.apiServer + collection)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(collection: string, item: User | Inventory | Quote| Company | Customer): Observable<User | Inventory | Quote| Company | Customer> {
    return this.httpClient.get<User | Inventory | Quote| Company | Customer>(this.apiServer + collection + "/"+ item._id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(collection: string, item: User | Inventory | Quote| Company | Customer): Observable<User | Inventory | Quote| Company | Customer> {
    return this.httpClient.delete<User | Inventory | Quote| Company | Customer>(this.apiServer + collection + "/"+ item._id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addItem(item: User | Inventory | Quote| Company | Customer, collection: string): Observable<User | Inventory | Quote| Company | Customer> {
    return this.httpClient.post<User | Inventory | Quote| Company | Customer>(this.apiServer + collection , item, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }   

  updateItem(item: User | Inventory | Quote| Company | Customer, collection: string): Observable<User | Inventory | Quote| Company | Customer> {
    return this.httpClient.put<User | Inventory | Quote| Company | Customer>(this.apiServer + collection, item, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  login(authData: any) {
    return this.httpClient.post<Auth>(this.apiServer + 'login', authData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  signup(user: User) {
    return this.httpClient.post<User>(this.apiServer + 'register', user, this.httpOptions)
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
     return throwError(error.error)
  }
}