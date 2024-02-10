import { Component, ViewEncapsulation, ViewChild } from '@angular/core'; 
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, STORAGE } from 'src/app/const/util';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Quote } from 'src/app/models/quote';
import { Inventory } from 'src/app/models/inventory';
import { Customer } from 'src/app/models/customer';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment'
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice';
import { ShareDialogComponent } from '../quotes/share/share.component';
import { SalesOrder } from 'src/app/models/sales-order';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class AppSalesOrderComponent { 
  currentCompany: Company;
  activeSalesOrder: SalesOrder;
  processQuoteMode: boolean = false;
  mailToString: string;
  // invoices: Invoice[] = [];
  salesOrders: SalesOrder[] = [];
  editSalesOrderMode: boolean = false;

  displayedColumns: string[] = ['salesOrderNo',  'salesOrderDate', 'createdBy', 'viewButton', 'shareButton'];
  documentId: string = 'salesOrderDocument';

  constructor(
     private spinner: NgxSpinnerService,
     public dialog: MatDialog,
     private dataService: DataService) {
  }
  
  ngOnInit(): void {
    // this.getInvoices();
    this.getCompany();
    this.getSalesOrders();
  }

  // getInvoices() {
  //   this.spinner.show();
  //   this.dataService.getAll(COLLECTION.INVOICES).subscribe((invoices: any) => {
  //     this.invoices = invoices;
  //     this.activeSalesOrder = invoices[0];
  //     console.log("Invoice ", invoices);
      
  //     this.spinner.hide();
  //   }, err => {
  //     this.spinner.hide();
  //     console.log(err);
  //   });
  // }

  getSalesOrders() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.SALES_ORDER).subscribe((salesOrders: any) => {
      this.salesOrders = salesOrders;
      this.activeSalesOrder = salesOrders[0];
      console.log("Sales orders ", salesOrders);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getCompany() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.COMPANIES).forEach((currentCompany: any) => {
      this.currentCompany = currentCompany[0];
      this.spinner.hide();
    });
  }

  manageSalesOrder(salesOrder: SalesOrder) {
    this.editSalesOrderMode = true;
    this.activeSalesOrder = salesOrder;
    console.log("Active salesOrder ", salesOrder);
    
  }

  formatAddress(address: string): string[] {
    const addNewLine = address.split('\n');
    const addComma = address.split(',');

    if(addNewLine.length > 0) {
      return addNewLine;
    }
    else if(addComma.length > 0) {      
      return addComma;
    } else {
      return [address]; 
    }
  }
 
  generateSalesOrderDocument(salesOrder: SalesOrder) {
    this.activeSalesOrder = salesOrder;
    this.openDialog(salesOrder);
  }

  openDialog(salesOrder: SalesOrder) {
    const dialogHandler = this.dialog.open(ShareDialogComponent, {
      width: '420px',
      data: {
        title: "Generate Sales Order",
        subHeader: "Your sales order has been generated as a (PDF) document. You can: "
      },
      disableClose: true
    });

     
    dialogHandler.afterClosed().subscribe((res)=> {
      console.log(res);
      if(res == 'share') {
        this.dataService.convetToPDF(this.documentId);
      } else if(res == 'download') {
        this.dataService.convetToPDF(this.documentId);
      } else {
        console.log("Closed");

      }
      
    })
  }

  
  processQuote(salesOrder: SalesOrder) {
    this.processQuoteMode = true;
    this.activeSalesOrder = salesOrder; 
    this.mailToString = `mailto:${this.activeSalesOrder.customer.emailAddress},${this.activeSalesOrder.customer.contactPerson.emailAddress}?subject=Quote%20no%20${this.activeSalesOrder.salesOrderNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;
  }

  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  downloadAsPDF() {
    this.dataService.convetToPDF(this.documentId)
  }
  
  cancel() {
    this.editSalesOrderMode = false;
  }
 
}
