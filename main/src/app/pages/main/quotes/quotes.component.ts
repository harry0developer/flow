import { Component } from '@angular/core'; 

import { DataService } from 'src/app/services/data.service';
import { COLLECTION, STORAGE } from 'src/app/const/util';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Quote } from 'src/app/models/quote';
import { Inventory, InventoryItem } from 'src/app/models/inventory';
import { Customer } from 'src/app/models/customer';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment'
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from './share/share.component';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class AppQuotesComponent {
  displayedColumns: string[] = ['quoteNo',  'quoteDate','items' ,'totalPriceInclusive', 'invoiced','viewButton', 'shareButton'];

  customers: Customer[] = [];
  inventoryItems: Inventory[] = [];

  selectedQuote: Quote = {
    invoiced: false,
    customer: {
      name: "",
      phoneNumber: "",
      emailAddress: "",
      registrationNumber: "",
      shippingAddress: "",
      photo: "",
      VATNumber: "", 
      billingAddress: "",
      contactPerson: {
        emailAddress: "", firstName: "", gender: "", lastName: "", phoneNumber: "", title: ""
      },
    },
    company: {
      name: "",
      phoneNumber: "",
      emailAddress: "",
      registrationNumber: "",
      shippingAddress: "",
      photo: "",
      VATNumber: "",

      bankDetails:  {
        accountNumber: "", branchCode: "", bankName: ""
      },
      billingAddress: "",
      contactPersonId: ""
    },
    items: [],
    quoteDate: new Date(),
    quoteDueDate: new Date(),
    quoteNo: "",
    quoteStartDate: new Date(),
    quoteTerm: 0,
    totalPriceDiscount: 0,
    totalPriceExclusive: 0,
    totalPriceInclusive: 0,
    totalVAT: 0
  };
  editMode: boolean = false;
  newQuote: boolean = false;

  editQuote: Quote;
  processQuoteMode: boolean = false;
  quoteToProcess: Quote;
 
  quoteForm: any;
  inventoryItemForm: any;
  quotes: Quote[] = [];
  filteredCustomers: Observable<Customer[]>;
  customerFormControl = new FormControl<string | Customer>('');

  filteredInventoryItems: Observable<Inventory[] | any[]>;
  inventoryFormControl = new FormControl<string | Inventory>('');
  dynamicArray: Inventory[] = [];
  currentCompany: Company;

  loggedInUser: User;
  mailToString: string;

  constructor(
    private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     public dialog: MatDialog,
     private dataService: DataService) {
  }
  
 
  ngOnInit(): void {
    this.getCompany();
    this.getQuotes();
    this.getCustomers(); 

    this.filterCustomers();
    
    this.getInventoryItems(); 
    this.filterInventoryItems();

    this.loggedInUser = this.dataService.getStorage(STORAGE.USER);

    this.quoteForm = this.formBuilder.group({
      quoteStartDate: ['', Validators.required],
      quoteDueDate: ['', Validators.required],
    });
  } 

  addNewItem() {
    const val: Inventory = this.inventoryFormControl.value as Inventory;
    const item: InventoryItem  = {
      id: val._id,
      name: val.name, 
      photo: val.photo,
      stockCode: val.stockCode, 
      description: val.description,
      quantity: 1,
      costPrice: val.costPrice,
      sellingPrice: val.sellingPrice,
      discountPrice: val.discountPrice,
      discountPercentage: val.discountPercentage,
      VAT: val.VAT
    }
 
    this.dynamicArray.push(item);
  }

  deleteRow(index: number) {
    this.dynamicArray.splice(index, 1);
  }

  getValues() {
    console.log(this.dynamicArray);
  }
  
  getCustomers() {
    this.dataService.getAll(COLLECTION.CUSTOMERS).forEach((customers: any) => {
      console.log("customers ", customers);
      this.customers = customers;
    });
  }

  formatDate(date?: Date) {
    return moment(date).format('DD/MM/YYYY');  
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
 

  getCompany() {
    this.dataService.getAll(COLLECTION.COMPANIES).forEach((currentCompany: any) => {
      console.log("currentCompany ", currentCompany);
      this.currentCompany = currentCompany[0];
    });
  }

  filterCustomers() {
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value.name;
        return name ? this._customerFilter(name as string) : this.customers.slice();
      }),
    );
  }

  getInventoryItems() {
    this.dataService.getAll(COLLECTION.INVENTORY).forEach((inventoryItems: any) => {
      console.log("inventoryItems ", inventoryItems);
      this.inventoryItems = inventoryItems;
    });
  }

  filterInventoryItems() {
    this.getInventoryItems(); 
    // Filter inventory by name 
    this.filteredInventoryItems = this.inventoryFormControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const inventoryItem = typeof value === 'string' ? value : value.name;
        return inventoryItem ? this._inventoryFilter(inventoryItem as string) : this.inventoryItems.slice();
      }),
    );
  }

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  displayInventoryFn(item: Inventory): string {
    return item && item.name && item.stockCode ? item.name + " (" + item.stockCode + ")": '';
  }

  private _inventoryFilter(name: string): Inventory[] {
    const filterValue = name.toLowerCase();

    return this.inventoryItems.filter(inv => inv.name.toLowerCase().includes(filterValue));
  }

  private _customerFilter(name: string): Customer[] {
    const filterValue = name.toLowerCase();

    return this.customers.filter(cus => cus.name.toLowerCase().includes(filterValue));
  }

  createNewQuote() {
    const dates = this.quoteForm.value;
    let start_Date = moment(dates.quoteDate);
    let end_Date = moment(dates.quoteDueDate);
    let totalDays = end_Date.diff(start_Date, 'days');

    let totalPriceDiscount = 0;
    let totalVAT = 0;
    let totalPriceExclusive = 0;
     this.dynamicArray.forEach((item: any) => { 
        totalPriceDiscount += (+item.discountPrice);
        totalVAT += (+item.VAT);
        totalPriceExclusive += (+item.sellingPrice * +item.quantity)
    });
    
    let newQuote: Quote = {
      customer: this.customerFormControl.value as Customer,
      company: this.currentCompany,
      items: this.dynamicArray,
      quoteDate: new Date(),
      quoteStartDate: dates.quoteStartDate,
      quoteDueDate: dates.quoteDueDate,
      quoteNo: this.dataService.generateRandomCodeNumber("QUO-"),
      quoteTerm: totalDays,
      totalPriceDiscount: totalPriceDiscount,
      totalVAT: totalVAT,
      totalPriceExclusive: totalPriceExclusive,
      totalPriceInclusive: (totalPriceExclusive + totalVAT - totalPriceDiscount),
      invoiced: false,
      createdBy: this.loggedInUser._id,
      createdOn:  new Date(),
      updatedBy: this.loggedInUser._id,
      updatedOn: new Date()
    };

    console.log("New Quote",newQuote);
    
 
    this.spinner.show();
    this.dataService.addItem(newQuote, COLLECTION.QUOTES).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.getQuotes();
      this.editMode = false;
      this.processQuoteMode = false;

    }, err => {
      this.spinner.hide();
    });
    
  }

  cancel() {
    this.editMode = false;
    this.processQuoteMode = false;
  }

  createQuote() {
    this.editMode = true;
    this.newQuote = true;
    this.processQuoteMode = false;
    this.quoteForm.reset()
  }
 
  addNewQuote() {
    this.editMode = true;
    this.newQuote = true;
    this.processQuoteMode = false;
  }

  getTotalPrice(item: Inventory) {
    return +item.costPrice * +item.quantity;
  }
 
  cancelEditQuote() {
    this.editMode = false;
    this.processQuoteMode = false;
  }

  getQuotes() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.QUOTES).subscribe((quotes: any) => {
      console.log("quotes ", quotes);
      this.quotes = quotes;
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }
  
  viewQuoteDetails(quote: Quote){
    this.editMode = true;
    this.editQuote = quote; 
    this.processQuoteMode = false;

  }

  generateQouteDocument(quote: Quote) {
    this.selectedQuote = quote;
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
        this.dataService.convetToPDF('contentToConvert');
      } else if(res == 'download') {
        this.dataService.convetToPDF('contentToConvert');
      } else {
        console.log("Closed");
      }
      
    })
  }



  /// INVOICE - PROCESS QUOTE

  
  processQuote(quote: Quote) {
    this.editMode = true;
    this.processQuoteMode = true;
    this.quoteToProcess  = quote;
    this.selectedQuote = quote; 
    this.mailToString = `mailto:${this.selectedQuote.customer.emailAddress},${this.selectedQuote.customer.contactPerson.emailAddress}?subject=Quote%20no%20${this.selectedQuote.quoteNo}&amp;body=Please%20find%20the%20requested%20quote%20attached%20`;
  }

  generateInvoiceFromQuote() {
    console.log(this.quoteToProcess);
    console.log(this.currentCompany);

    let newInvoice: Invoice = {
      invoiceNo: this.dataService.generateRandomCodeNumber("INV-"),
      invoiceDate: new Date(),
      invoiceDueDate: new Date(),
      invoiceTerm: "Due on receipt",
      customer: this.selectedQuote.customer,
      company: this.selectedQuote.company,
      totalPriceExclusive: this.selectedQuote.totalPriceExclusive,
      totalVAT: this.selectedQuote.totalVAT,
      totalPriceDiscount: this.selectedQuote.totalPriceDiscount,
      totalPriceInclusive: this.selectedQuote.totalPriceInclusive,
      quote: this.selectedQuote._id,
      hasSalesOrder: false,
      createdOn: new Date(),
      createdBy: this.dataService.getStorage(STORAGE.USER)._id,
      updatedOn: new Date(),
      updatedBy: this.dataService.getStorage(STORAGE.USER)._id,
    }
    
    this.spinner.show();
    this.dataService.addItem(newInvoice, COLLECTION.INVOICES).subscribe((res) => {
      console.log(res);
      this.editMode = false;
      this.processQuoteMode = false;
      
      this.selectedQuote.invoiced = true;
      this.selectedQuote.invoice = res._id;
      this.dataService.updateItem(this.selectedQuote, COLLECTION.QUOTES).subscribe(res => {
        console.log("Quote Updated", res);
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

  downloadAsPDF() {
    this.dataService.convetToPDF('qouteDocument')
  }
  
 

}

 