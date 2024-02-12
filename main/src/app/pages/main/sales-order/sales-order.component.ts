import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core'; 
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
import { DocumentData } from 'src/app/models/document';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class AppSalesOrderComponent { 
   
  
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  activeIndex: number;
  salesOrders: SalesOrder[] = [];
  selectedSalesOrder: SalesOrder;
  currentCompany: Company;
  salesOrderPreviewColumnDisplay: string[] = ['name', 'stockCode', 'unitPrice', 'quantity', 'totalPrice'];
  mailToString: string;

  documentData: DocumentData;

  constructor(
     private spinner: NgxSpinnerService,
     public dialog: MatDialog,
     private dataService: DataService) {
  }


  
  // Search quotes 
  
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  clearFilter() {
    this.searchText = ''
  }

  documentAction(action: string) {
    this.downloadAsPDF();
 }

  
  ngOnInit(): void {
    this.getCompany();
    this.getSalesOrders();
  }
 

  setSelectedSalesOrder(so: SalesOrder, index: number) {
    this.selectedSalesOrder = so;
    this.activeIndex = index; 
    this.mailToString = `mailto:${this.selectedSalesOrder.customer.emailAddress},${this.selectedSalesOrder.customer.contactPerson.emailAddress}?subject=Sales%20Order%20No%20${this.selectedSalesOrder.salesOrderNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;

    this.documentData = {
      title: "Sales Order",
      reference: this.selectedSalesOrder.salesOrderNo,
      customerName: this.selectedSalesOrder.customer.name,
      address: this.currentCompany.billingAddress,
      no: this.selectedSalesOrder.salesOrderNo,
      startDate: this.selectedSalesOrder.salesOrderDate,
      term: null,
      dueDate: null,
      items: this.selectedSalesOrder.quote.items,
      totalPriceExclusive: this.selectedSalesOrder.quote.totalPriceExclusive,
      totalVAT: this.selectedSalesOrder.quote.totalVAT,
      totalPriceDiscount: this.selectedSalesOrder.quote.totalPriceDiscount,
      totalPriceInclusive: this.selectedSalesOrder.quote.totalPriceInclusive
    }
    window.scrollTo({ top: 1000, behavior: 'smooth' });
 
  }

  getSalesOrders() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.SALES_ORDER).subscribe((salesOrders: any) => {
      this.salesOrders = salesOrders;
      this.selectedSalesOrder = salesOrders[0];
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
    this.selectedSalesOrder = salesOrder;
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
    this.selectedSalesOrder = salesOrder;
    this.downloadAsPDF();
  }
 
   
  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  downloadAsPDF() {
    this.dataService.convetToPDF('qouteDocument')
  }
  
 
 
}
