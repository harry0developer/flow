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
import { Invoice } from '../models/invoice';
import { SalesOrder } from '../models/sales-order';



import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PurchaseOrder } from '../models/purchase-order';

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

  
  generateRandomCodeNumber(preFix: string): string {
    return preFix + Math.floor(Math.random()*90000) + 10000;
  }


  
  convetToPDF(id: string) {
    var data = document.getElementById(id);
    console.log("DAta doc", data);
    
    html2canvas((data as any)).then(canvas => {
    // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(new Date().getTime().toString() + '.pdf'); // Generated PDF
    }).catch(err => {
      console.log(err);
    });
  }
 
  setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key);
  }

  getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  getAll(collection: string): Observable<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder> {
    return this.httpClient.get<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder>(this.apiServer + collection)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(collection: string, item: User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder): Observable<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder> {
    return this.httpClient.get<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder>(this.apiServer + collection + "/"+ item._id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(collection: string, item: User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder): Observable<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder> {
    return this.httpClient.delete<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder>(this.apiServer + collection + "/"+ item._id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addItem(item: User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder, collection: string): Observable<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder> {
    return this.httpClient.post<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder>(this.apiServer + collection , item, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }   

  updateItem(item: User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder, collection: string): Observable<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder> {
    return this.httpClient.put<User | Inventory | Quote| Company | Customer | Invoice | SalesOrder | PurchaseOrder>(this.apiServer + collection, item, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  login(authData: any) {
    return this.httpClient.post<any>(this.apiServer + 'login', authData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  signup(user: User) {
    return this.httpClient.post<any>(this.apiServer + 'register', user, this.httpOptions)
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