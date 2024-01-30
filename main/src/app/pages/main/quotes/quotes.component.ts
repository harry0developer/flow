import { Component } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, COMPANY_TYPE, GENDER, TITLE } from 'src/app/const/util';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";
import { Quote } from 'src/app/models/quote';
import { Inventory } from 'src/app/models/inventory';
import { Customer } from 'src/app/models/customer';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment'
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class AppQuotesComponent {
  displayedColumns: string[] = ['quoteNo',  'quoteDate', 'name' ,'contactPerson', 'totalPriceInclusive', 'actionButton'];

  customers: Customer[] = [];
  inventoryItems: Inventory[] = [];

  selectedQuote: Quote = {
    id: "",
    customer: {
      id:"",
      companyName: "",
      phoneNumber: "",
      emailAddress: "",
      registrationNumber: "",
      shippingAddress: "",
      type: "",
      url: "",
      VATNumber: "",

      bankDetails:  {
        accountNumber: "", branchCode: "", bankName: ""
      },
      billingAddress: "",
      contactPerson: {
        emailAddress: "", firstName: "", gender: "", lastName: "", phoneNumber: "", title: ""
      },
    },
    company: {
      id:"",
      name: "",
      phoneNumber: "",
      emailAddress: "",
      registrationNumber: "",
      shippingAddress: "",
      logo: "",
      VATNumber: "",

      bankDetails:  {
        accountNumber: "", branchCode: "", bankName: ""
      },
      billingAddress: "",
      contactPerson: {
        emailAddress: "", firstName: "", gender: "", lastName: "", phoneNumber: "", title: ""
      },
    },
    items: [],
    quoteDate: "",
    quoteDueDate: "",
    quoteNo: "",
    quoteStartDate: "",
    quoteTerm: "",
    totalPriceDiscount: "",
    totalPriceExclusive: "",
    totalPriceInclusive: "",
    totalVAT: ""
  };
  editMode: boolean = false;
  newQuote: boolean = false;

  editQuote: Quote;
 
  quoteForm: any;
  inventoryItemForm: any;
  quotes: Quote[];
  autoGeneratedQuoteNumber: string;
  filteredCustomers: Observable<Customer[]>;
  customerFormControl = new FormControl<string | Customer>('');

  filteredInventoryItems: Observable<Inventory[] | any[]>;
  inventoryFormControl = new FormControl<string | Inventory>('');
  dynamicArray: any[] = [];
  currentCompany: Company;

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
  }
  
 
  ngOnInit(): void {

    this.getCompany();
    this.getQuotes();
    //FIlter customer by name
    this.getCustomers(); 
    this.filterCustomers();
    this.autoGeneratedQuoteNumber = this.generateRandomCodeNumber();

    
    // this.getQuotes();
    this.getInventoryItems(); 
    this.filterInventoryItems();
    

    this.quoteForm = this.formBuilder.group({
      quoteStartDate: ['', Validators.required],
      quoteDueDate: ['', Validators.required],
    });
  } 

  addNewItem() {
    const val: Inventory = this.inventoryFormControl.value as Inventory;
    val.quantity = "1";
    this.dynamicArray.push(val);
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

  formatDate(date?: string) {
    return moment(date).format('ll');  
  }

  getCompany() {
    this.dataService.getAll(COLLECTION.MY_COMPANIES).forEach((currentCompany: any) => {
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
    return customer && customer.companyName ? customer.companyName : '';
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

    return this.customers.filter(cus => cus.companyName.toLowerCase().includes(filterValue));
  }

  generateRandomCodeNumber(): string {
    return "QUO-" + Math.floor(Math.random()*90000) + 10000;
  }

  createNewQuote() {
    console.log("Customer ", this.customerFormControl.value);
    console.log("Items ", this.dynamicArray);
    console.log("Date ", this.quoteForm.value);

    const dates = this.quoteForm.value;
    let start_Date = moment(dates.quoteDate);
    let end_Date = moment(dates.quoteDueDate);
    let totalDays = end_Date.diff(start_Date, 'days');

    let totalPriceDiscount = 0;
    let totalVAT = 0;
    let totalPriceExclusive = 0;
     this.dynamicArray.forEach(item => { 
        totalPriceDiscount += (+item.discount);
        totalVAT += (+item.VAT);
        totalPriceExclusive += (+item.unitPrice * +item.quantity)
     
    });
    
    let newQuote: Quote = {
      id: uuid(),
      customer: this.customerFormControl.value as Customer,
      company: this.currentCompany,
      items: this.dynamicArray,
      quoteDate: moment().format(),
      quoteStartDate: dates.quoteStartDate,
      quoteDueDate: dates.quoteDueDate,
      quoteNo: this.autoGeneratedQuoteNumber,
      quoteTerm: totalDays.toString(),
      totalPriceDiscount: totalPriceDiscount.toString(),
      totalVAT: totalVAT.toString(),
      totalPriceExclusive: totalPriceExclusive.toString(),
      totalPriceInclusive: (totalPriceExclusive + totalVAT - totalPriceDiscount).toString(),
      createdBy: "Donald Kgomo",
      createdOn:  moment().format(),
      updatedBy: "",
      updatedOn: ""
    };
 
    this.dataService.addItem(newQuote, COLLECTION.QUOTES).forEach(res => {
      console.log(res);
      this.getQuotes();
      this.editMode = false;
    });
    
  }

  cancel() {
    this.editMode = false;
  }

  createQuote() {
    this.editMode = true;
    this.newQuote = true;
  }

  addQuote() { 
    const form = this.quoteForm.value;
    const quote: Quote = {
      id: "ff890d81-9090-4b46-89f9-3f546b2386f0", 
      quoteNo: "SCCND-100-000",
      quoteDate: "01/01/2024",
      quoteDueDate: "01/02/2024",
      quoteStartDate: "01/01/2024",
      quoteTerm: "30 days",
      customer: {
        id: "f1200cd81-a2d1-4b46-8000-3f546b2386f0",
        url: "",
        type: COMPANY_TYPE.ADMIN,
        companyName: "Silver Stripe Holdings",
        VATNumber: "5600100-10000",
        registrationNumber: "2000/20000/10",
        billingAddress: "222 Grey str, Seshego Zone 1, Polokwane, 1900",
        shippingAddress: "222 Grey str, Seshego Zone 1, Polokwane, 1900",
        emailAddress: "info@silverstripe.com",
        phoneNumber: "0150006000",
        contactPerson: {
          firstName: "Tshwene",
          lastName: "Mogolola",
          emailAddress: "siwe@blueprint.com",
          phoneNumber: "0805003020",
          title: TITLE.MISS, 
          gender: GENDER.FEMALE
        },
        bankDetails: {
          accountNumber: "100200040",
          branchCode: "909090",
          bankName: "Midway Mews",
        }
      },
      company: {
        id:"",
        name: "",
        phoneNumber: "",
        emailAddress: "",
        registrationNumber: "",
        shippingAddress: "",
        logo: "",
        VATNumber: "",
  
        bankDetails:  {
          accountNumber: "", branchCode: "", bankName: ""
        },
        billingAddress: "",
        contactPerson: {
          emailAddress: "", firstName: "", gender: "", lastName: "", phoneNumber: "", title: ""
        },
      },
      items: [
        {
          id: "g9dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Teaspoon", 
          photo: "https://placehold.co/100",
          stockCode: "TSP-100", 
          description: "A very nice spoon",
          quantity: "2",
          discount: "0",
          VAT: "0",
          unitPrice: "2400"
        },
        {
          id: "f0dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Fork", 
          photo: "https://placehold.co/100",
          stockCode: "FRK-100", 
          description: "A silcer fork",
          quantity: "5",
          discount: "0",
          VAT: "0",
          unitPrice: "50"
        }
      ],
      totalPriceExclusive: "450",
      totalVAT: "0",
      totalPriceDiscount: "0",
      totalPriceInclusive: "450",
      createdOn: "" + new Date().getTime(),
      createdBy: "Donald Kgomo", 
      updatedOn: "" + new Date().getTime(),
      updatedBy: "Donald Kgomo"
    }

    if(this.newQuote) {
      quote.id = uuid();
      this.dataService.addItem(quote, COLLECTION.QUOTES).forEach((res: any) => {
        console.log("Quote added successfully ", res);
        this.editMode = false;
        this.getQuotes();
      });
    } else {
      quote.id = this.editQuote.id,
      this.dataService.updateItem(quote, COLLECTION.QUOTES).forEach((res: any) => {
        console.log("Quote updated successfully ", res);
        this.editMode = false;
        this.getQuotes();
      }); 
    }
  }

  addNewQuote() {
    this.editMode = true;
    this.newQuote = true;
  }

  getTotalPrice(item: Inventory) {
    return +item.unitPrice * +item.quantity;
  }
 
  cancelEditQuote() {
    this.editMode = false;
  }

  getQuotes() {
    this.spinner.show();

    this.dataService.getAll(COLLECTION.QUOTES).forEach((quotes: any) => {
      console.log("quotes ", quotes);
      this.quotes = quotes;
      this.spinner.hide();
    });
  }
  
  viewQuoteDetails(quote: Quote){
    this.editMode = true;
    this.editQuote = quote; 

  }

  downloadQuote(quote: Quote) {
    this.selectedQuote = quote;
    console.log("Download Quote ", quote);
    
    // this.convetToPDF();
  }

  convetToPDF() {
    this.spinner.show();

    var data = document.getElementById('contentToConvert');
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
        pdf.save('new-file.pdf'); // Generated PDF
        this.spinner.hide();
      });
  }

}

