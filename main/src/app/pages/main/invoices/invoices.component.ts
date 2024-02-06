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

  displayedColumns: string[] = ['invoiceNo',  'invoiceDate', 'quoteNo', 'totalPriceInclusive', 'viewButton', 'shareButton'];

  constructor(
    private formBuilder: FormBuilder,
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
 
  generateInvoiceDocument(invoice: Invoice) {
    this.activeInvoice = invoice;
    this.openDialog(invoice);
  }

  openDialog(invoice: Invoice) {
    const dialogHandler = this.dialog.open(ShareDialogComponent, {
      width: '420px',
      disableClose: true
    });

     
    dialogHandler.afterClosed().subscribe((res)=> {
      console.log(res);
      if(res == 'share') {
        this.convetToPDF('contentToConvert');
      } else if(res == 'download') {
        this.convetToPDF('contentToConvert');
      } else {
        console.log("Closed");

      }
      
    })
  }

  manageInvoice(invoice: Invoice) {
    console.log(invoice);
    
  }

  processQuote(invoice: Invoice) {
    this.processQuoteMode = true;
    this.activeInvoice = invoice; 
    this.mailToString = `mailto:${this.activeInvoice.customer.emailAddress},${this.activeInvoice.customer.contactPerson.emailAddress}?subject=Quote%20no%20${this.activeInvoice.invoiceNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;
  }

  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  convetToPDF(id: string) {
    this.spinner.show();
    var data = document.getElementById(id);
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
        this.spinner.hide();
      });
  }
}
