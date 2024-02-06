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
import { SalesOrder } from 'src/app/models/sale-order';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class AppInvoicesComponent { 
  currentCompany: Company;
  activeInvoice: Invoice;
  processQuoteMode: boolean = false;
  mailToString: string;
  invoices: Invoice[] = [];
  editInvoiceMode: boolean = false;
  documentId = 'invoiceDocument';

  displayedColumns: string[] = ['invoiceNo',  'invoiceDate', 'quoteNo', 'totalPriceInclusive', 'salesOrder', 'viewButton', 'shareButton'];

  constructor(
     private spinner: NgxSpinnerService,
     public dialog: MatDialog,
     private dataService: DataService) {
  }
  
  ngOnInit(): void {
    this.getInvoices();
    this.getCompany();
  }

  getInvoices() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.INVOICES).subscribe((invoices: any) => {
      this.invoices = invoices;
      this.activeInvoice = invoices[0];
      console.log("Invoice ", invoices);
      
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

  manageInvoice(invoice: Invoice) {
    this.editInvoiceMode = true;
    this.activeInvoice = invoice;
    console.log("Active invoice ", invoice);
    
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

  generateSalesOrder() {
    console.log('invoice ', this.activeInvoice);
    const salesOrder: SalesOrder = {
      salesOrderNo: this.dataService.generateRandomCodeNumber("SON-"),
      salesOrderDate: new Date(),
      customer: this.activeInvoice.customer,
      company: this.activeInvoice.company,
      quote: this.activeInvoice.quote,
      invoice: this.activeInvoice,
      createdOn: new Date(),
      createdBy: this.dataService.getStorage(STORAGE.USER)._id,
      updatedOn: new Date(),
      updatedBy: this.dataService.getStorage(STORAGE.USER)._id,
    }
 
    this.spinner.show();
    this.dataService.addItem(salesOrder, COLLECTION.SALES_ORDER).subscribe((res) => {
      console.log(res);
      this.editInvoiceMode = false;
      this.processQuoteMode = false;
      this.activeInvoice.hasSalesOrder = true;
      this.activeInvoice.salesOrder = res._id;
      
      this.dataService.updateItem(this.activeInvoice, COLLECTION.INVOICES).subscribe(res => {
        console.log("Invoice Updated", res);
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      })
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
    
  }

 
  generateInvoiceDocument(invoice: Invoice) {
    this.activeInvoice = invoice;
    this.openDialog();
  }

  openDialog(): void {
    const dialogHandler = this.dialog.open(ShareDialogComponent, {
      width: '420px',
      data: {
        title: "Generate Quote",
        subHeader: "Your qoute has been generated as a (PDF) document. You can: "
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

  
  processQuote(invoice: Invoice) {
    this.processQuoteMode = true;
    this.activeInvoice = invoice; 
    this.mailToString = `mailto:${this.activeInvoice.customer.emailAddress},${this.activeInvoice.customer.contactPerson.emailAddress}?subject=Quote%20no%20${this.activeInvoice.invoiceNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;
  }

  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  downloadAsPDF() {
    this.dataService.convetToPDF(this.documentId)
  }
  
  cancel() {
    this.editInvoiceMode = false;
  }
}