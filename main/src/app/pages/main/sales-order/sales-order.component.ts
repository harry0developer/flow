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

  
  ngOnInit(): void {
    this.getCompany();
    this.getSalesOrders();
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
      
    } else if(action === 'gen-purchase-order') {
      console.log('Generate Purchase Order');
      this.generatePurchaseOrder();
    }
  
  }

  private generatePurchaseOrder() {
    let purchaseOrder: PurchaseOrder = {
      purchaseOrderNo: this.dataService.generateRandomCodeNumber("PRC-"),
      purchaseOrderDate: new Date(),
      customer: this.selectedSalesOrder.customer,
      company: this.selectedSalesOrder.company, 
      quote: this.selectedSalesOrder.quote, 
      salesOrder: this.selectedSalesOrder._id as string,
      hasInvoice: false,
      createdOn: new Date(),
      createdBy: this.dataService.getStorage(STORAGE.USER)._id,
      updatedOn: new Date(),
      updatedBy: this.dataService.getStorage(STORAGE.USER)._id,
    }
    
    console.log("Purcahse order ", purchaseOrder);
    
    this.spinner.show();
    this.dataService.addItem(purchaseOrder, COLLECTION.PURCHASE_ORDER).subscribe((res) => {
      console.log(res); 
      this.selectedSalesOrder.hasPurchaseOrder = true;
      this.selectedSalesOrder.purchaseOrder = res._id;
      this.dataService.updateItem(this.selectedSalesOrder, COLLECTION.QUOTES).subscribe(res => {
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



  setSelectedSalesOrder(so: SalesOrder, index: number) {
    this.selectedSalesOrder = so;
    this.activeIndex = index; 
    this.mailToString = `mailto:${this.selectedSalesOrder?.customer?.emailAddress},${this.selectedSalesOrder?.customer?.contactPerson?.emailAddress}?subject=Sales%20Order%20No%20${this.selectedSalesOrder?.salesOrderNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;

    this.documentData = {
      title: "Sales Order",
      reference: this.selectedSalesOrder?.salesOrderNo,
      customerName: this.selectedSalesOrder?.customer?.name,
      address: this.selectedSalesOrder?.customer?.billingAddress,
      no: this.selectedSalesOrder?.salesOrderNo,
      startDate: this.selectedSalesOrder?.salesOrderDate,
      term: null,
      VATNumber: this.selectedSalesOrder.customer.VATNumber,
      dueDate: null,
      items: this.selectedSalesOrder?.quote.items,
      totalPriceExclusive: this.selectedSalesOrder?.quote.totalPriceExclusive,
      totalVAT: this.selectedSalesOrder?.quote.totalVAT,
      totalPriceDiscount: this.selectedSalesOrder?.quote.totalPriceDiscount,
      totalPriceInclusive: this.selectedSalesOrder?.quote.totalPriceInclusive
    }
    window.scrollTo({ top: 1000, behavior: 'smooth' });
 
  }

  getSalesOrders() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.SALES_ORDER).subscribe((salesOrders: any) => {
      this.salesOrders = salesOrders;
      console.log("Sales order ", salesOrders);
      
      this.setSelectedSalesOrder(salesOrders[0], 0);
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
