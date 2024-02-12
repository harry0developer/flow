import { Component, ViewChild, ElementRef } from '@angular/core'; 
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, STORAGE } from 'src/app/const/util'; 
import { NgxSpinnerService } from "ngx-spinner"; 
import * as moment from 'moment'
import { Company } from 'src/app/models/company'; 
import { Invoice } from 'src/app/models/invoice'; 
import { DocumentData } from 'src/app/models/document';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class AppInvoicesComponent { 
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  activeIndex: number;
  invoices: Invoice[] = [];
  selectedInvoice: Invoice;
  currentCompany: Company;
  invoicePreviewColumnDisplay: string[] = ['name', 'stockCode', 'unitPrice', 'quantity', 'totalPrice'];
  mailToString: string;
  documentData: DocumentData;

  constructor(
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getCompany();
    this.geInvoices();
  }
 
  
  private geInvoices() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.INVOICES).subscribe((invoices: any) => {
      this.invoices = invoices;
      console.log("Invoices  ", invoices);
      this.setSelectedInvoice(invoices[0], 0);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
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
      
    } else if(action === 'gen-delivery-note') {
      console.log('Generate Invoice');
      this.generateDeliveryNote();
    }
  }

  private _getTerm(startDate: Date, endDate: any): number {
    let start_Date = moment(startDate);
    let end_Date = moment(endDate);
    return end_Date.diff(start_Date, 'days');
  }

  private generateDeliveryNote() {
 
    const nextMonth = moment('02/28/2018', "MM/DD/YYYY").add(1, 'M');

    let invoice: Invoice = {
      invoiceNo: this.dataService.generateRandomCodeNumber("INV-"),
      invoiceDate: new Date(),
      customer: this.selectedInvoice.customer,
      company: this.selectedInvoice.company, 
      purchaseOrder: this.selectedInvoice._id as string, 
      quote: this.selectedInvoice.quote, 
      salesOrder: this.selectedInvoice.salesOrder,
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
      this.dataService.updateItem(this.selectedInvoice, COLLECTION.PURCHASE_ORDER).subscribe(res => {
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


  setSelectedInvoice(invoice: Invoice, index: number) {

    this.selectedInvoice = invoice;
    this.activeIndex = index; 
    this.mailToString = `mailto:${this.selectedInvoice?.customer?.emailAddress},${this.selectedInvoice?.customer?.contactPerson?.emailAddress}?subject=Invoice%20No%20${this.selectedInvoice?.invoiceNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;

    this.documentData = {
      title: "Invoice",
      reference: this.selectedInvoice?.invoiceNo,
      customerName: this.selectedInvoice?.customer.name,
      address: this.selectedInvoice?.customer.billingAddress,
      no: this.selectedInvoice?.invoiceNo,
      startDate: this.selectedInvoice?.invoiceDate,
      VATNumber: this.selectedInvoice?.customer.VATNumber,
      term: null,
      dueDate: null,
      items: this.selectedInvoice?.quote.items,
      totalPriceExclusive: this.selectedInvoice?.quote.totalPriceExclusive,
      totalVAT: this.selectedInvoice?.quote.totalVAT,
      totalPriceDiscount: this.selectedInvoice?.quote.totalPriceDiscount,
      totalPriceInclusive: this.selectedInvoice?.quote.totalPriceInclusive
    }
    window.scrollTo({ top: 1000, behavior: 'smooth' });
 
  }

 

  getCompany() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.COMPANIES).forEach((currentCompany: any) => {
      this.currentCompany = currentCompany[0];
      this.spinner.hide();
    });
  }

  manageSalesOrder(invoice: Invoice) {
    this.selectedInvoice = invoice;
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
 
  generateSalesOrderDocument(invoice: Invoice) {
    this.selectedInvoice = invoice;
    this.downloadAsPDF();
  }
 
   
  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
  }

  downloadAsPDF() {
    this.dataService.convetToPDF('qouteDocument')
  }
  
 
 
}
