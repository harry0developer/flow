import { Component, ViewChild, ElementRef } from '@angular/core'; 
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, STORAGE } from 'src/app/const/util';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment'
import { Company } from 'src/app/models/company';
import { MatDialog } from '@angular/material/dialog';
import { SalesOrder } from 'src/app/models/sales-order';
import { DocumentData } from 'src/app/models/document';
import { PurchaseOrder } from 'src/app/models/purchase-order';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class AppPaymentComponent { 
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  activeIndex: number;
  purchaseOrders: PurchaseOrder[] = [];
  selectedPurchaseOrder: PurchaseOrder;
  currentCompany: Company;
  purchaseOrderPreviewColumnDisplay: string[] = ['name', 'stockCode', 'unitPrice', 'quantity', 'totalPrice'];
  mailToString: string;
  documentData: DocumentData;

  constructor(
     private spinner: NgxSpinnerService,
     public dialog: MatDialog,
     private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getCompany();
    this.getPurchaseOrders();
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
    if(action === 'download') {
      console.log('Download doc');
      this.downloadAsPDF();
      
    } else if(action === 'gen-invoice') {
      console.log('Generate Invoice');
      this.generateInvoice();
    }
  }

  private _getTerm(startDate: Date, endDate: any): number {
    let start_Date = moment(startDate);
    let end_Date = moment(endDate);
    return end_Date.diff(start_Date, 'days');
  }

  private generateInvoice() {
 
    const nextMonth = moment('02/28/2018', "MM/DD/YYYY").add(1, 'M');

    let invoice: Invoice = {
      invoiceNo: this.dataService.generateRandomCodeNumber("INV-"),
      invoiceDate: new Date(),
      customer: this.selectedPurchaseOrder.customer,
      company: this.selectedPurchaseOrder.company, 
      quote: this.selectedPurchaseOrder.quote, 
      purchaseOrder: this.selectedPurchaseOrder._id as string,
      salesOrder: this.selectedPurchaseOrder.salesOrder as SalesOrder,
      paid: false,
      createdOn: new Date(),
      createdBy: this.dataService.getStorage(STORAGE.USER)._id,
      updatedOn: new Date(),
      updatedBy: this.dataService.getStorage(STORAGE.USER)._id,
    }
    
    console.log("New Invoice ", invoice);
    
    this.spinner.show();
    this.dataService.addItem(invoice, COLLECTION.INVOICES).subscribe((res) => {
      console.log(res); 
      this.selectedPurchaseOrder.hasInvoice = true;
      this.selectedPurchaseOrder.invoice = res._id;
      this.dataService.updateItem(this.selectedPurchaseOrder, COLLECTION.PURCHASE_ORDER).subscribe(res => {
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


  setSelectedPurchaseOrder(po: PurchaseOrder, index: number) {
    this.selectedPurchaseOrder = po;
    this.activeIndex = index; 
    this.mailToString = `mailto:${this.selectedPurchaseOrder?.customer?.emailAddress},${this.selectedPurchaseOrder?.customer?.contactPerson?.emailAddress}?subject=Purchase%20Order%20No%20${this.selectedPurchaseOrder?.purchaseOrderNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;

    this.documentData = {
      title: "Purchase Order",
      reference: this.selectedPurchaseOrder.purchaseOrderNo,
      customerName: this.selectedPurchaseOrder.customer.name,
      address: this.selectedPurchaseOrder.customer.billingAddress,
      no: this.selectedPurchaseOrder.purchaseOrderNo,
      startDate: this.selectedPurchaseOrder.purchaseOrderDate,
      VATNumber: this.selectedPurchaseOrder.customer.VATNumber,
      term: null,
      dueDate: null,
      items: this.selectedPurchaseOrder.quote.items,
      totalPriceExclusive: this.selectedPurchaseOrder.quote.totalPriceExclusive,
      totalVAT: this.selectedPurchaseOrder.quote.totalVAT,
      totalPriceDiscount: this.selectedPurchaseOrder.quote.totalPriceDiscount,
      totalPriceInclusive: this.selectedPurchaseOrder.quote.totalPriceInclusive
    }
    window.scrollTo({ top: 1000, behavior: 'smooth' });
 
  }

  getPurchaseOrders() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.PURCHASE_ORDER).subscribe((purchaseOrders: any) => {
      this.purchaseOrders = purchaseOrders;
      console.log("Purchase orders ", purchaseOrders);
      this.setSelectedPurchaseOrder(purchaseOrders[0], 0);
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

  manageSalesOrder(purchaseOrder: PurchaseOrder) {
    this.selectedPurchaseOrder = purchaseOrder;
    console.log("Active purchaseOrder ", purchaseOrder);
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
 
  generateSalesOrderDocument(purchaseOrder: PurchaseOrder) {
    this.selectedPurchaseOrder = purchaseOrder;
    this.downloadAsPDF();
  }
 
   
  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  downloadAsPDF() {
    this.dataService.convetToPDF('qouteDocument')
  }
  
 
 
}
