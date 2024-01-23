import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";
import { Quote } from 'src/app/models/quote';
import { Inventory } from 'src/app/models/inventory';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class AppQuotesComponent {
  displayedColumns: string[] = ['quoteNo',  'quoteDate', 'companyName' ,'contactPerson', 'totalPriceInclusive', 'actionButton'];

  dataSource: Quote[] = [
    {
      id: "d9dfdd81-92d1-4b46-89f9-3f546b2386f0", 
      quoteNo: "FRST-100-000",
      quoteDate: "01/10/2023",
      quoteDueDate: "01/11/2024",
      quoteTerm: "30 days",
      customer: {
        id: "f9dfdd81-a2d1-4b46-8000-3f546b2386f0",
        url: "",
        companyName: "Freshwater Corp",
        companyVATNumber: "400100-10000",
        companyBillingAddress: "123 main str,steelfontein, Mpumalanga, 2010",
        companyShippingAddress: "123 main str,steelfontein, Mpumalanga, 2010",
        contactPersonFirstName: "Andile",
        contactPersonLastName: "Papo",
        contactPersonEmail: "andile@blueprint.com",
        contactPersonPhoneNumber: "0825003020",
        contactPersonTitle: "Mr.", 
      },
      items: [
        {
          id: "g9dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Teaspoon", 
          photo: "https://placehold.co/100",
          stockCode: "TSP-100", 
          description: "A very nice spoon",
          quantity: "10",
          unitPrice: "100",
          VAT: "0"
        },
        {
          id: "f0dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Fork", 
          photo: "https://placehold.co/100",
          stockCode: "FRK-100", 
          description: "A silcer fork",
          quantity: "5",
          unitPrice: "550",
          VAT: "0"
        }
      ],
      totalPriceExclusive: "1500",
      totalVAT: "0",
      totalPriceDiscount: "0",
      totalPriceInclusive: "1500",
    },
    {
      id: "ff890d81-9090-4b46-89f9-3f546b2386f0", 
      quoteNo: "SCCND-100-000",
      quoteDate: "01/01/2024",
      quoteDueDate: "01/02/2024",
      quoteTerm: "30 days",
      customer: {
        id: "f9dfdd81-a2d1-4b46-8000-3f546b2386f0",
        url: "",
        companyName: "Dinokeng PTY Ltd",
        companyVATNumber: "400100-10000",
        companyBillingAddress: "123 Grey road, Bendor Parl, Polokwane, 2190",
        companyShippingAddress: "123 Grey road, Bendor Parl, Polokwane, 2190",
        contactPersonFirstName: "Moses",
        contactPersonLastName: "Thakgola",
        contactPersonEmail: "moses@dinokeng.com",
        contactPersonPhoneNumber: "0825003020",
        contactPersonTitle: "Mr.", 
      },
      items: [
        {
          id: "g9dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Pots", 
          photo: "https://placehold.co/100",
          stockCode: "LAB-200", 
          description: "designer ports",
          quantity: "40",
          unitPrice: "2400",
          VAT: "0"
        },
        {
          id: "f0dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Frying Pan", 
          photo: "https://placehold.co/100",
          stockCode: "FPN-09100", 
          description: "A non sticky frying pan",
          quantity: "2",
          unitPrice: "7500",
          VAT: "0"
        }
      ],
      totalPriceExclusive: "26400",
      totalVAT: "0",
      totalPriceDiscount: "50",
      totalPriceInclusive: "26400",
    }

  ];

  selectedQuote: Quote = this.dataSource[0];
  editMode: boolean = false;
  newQuote: boolean = false;

  editQuote: Quote;
 
  quoteForm: any;
  quotes: Quote[];

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
    // sales overview chart 
  }

 
  ngOnInit(): void {
    // this.getQuotes();
    this.quoteForm = this.formBuilder.group({
      quoteDate: ['', Validators.required],
      quoteDueDate: ['', Validators.required],
      quoteTerm: ['', Validators.required],
      customer: ['', Validators.required],
      items: ['', Validators.required]
    });
  } 

  generateRandomCodeNumber(): string {
    return "QUO-" + Math.floor(Math.random()*90000) + 10000;
  }

 

  addQuote() { 
    const form = this.quoteForm.value;
    const quote: Quote = {
      id: "ff890d81-9090-4b46-89f9-3f546b2386f0", 
      quoteNo: "SCCND-100-000",
      quoteDate: "01/01/2024",
      quoteDueDate: "01/02/2024",
      quoteTerm: "30 days",
      customer: {
        id: "f9dfdd81-a2d1-4b46-8000-3f546b2386f0",
        url: "",
        companyName: "Blue Print Media",
        companyVATNumber: "VAT-100-10000",
        companyBillingAddress: "123 main str,steelfontein, Mpumalanga, 2010",
        companyShippingAddress: "123 main str,steelfontein, Mpumalanga, 2010",
        contactPersonFirstName: "Sisanda",
        contactPersonLastName: "Mawela",
        contactPersonEmail: "sisanda@blueprint.com",
        contactPersonPhoneNumber: "0825003020",
        contactPersonTitle: "Mrs.", 
      },
      items: [
        {
          id: "g9dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Teaspoon", 
          photo: "https://placehold.co/100",
          stockCode: "TSP-100", 
          description: "A very nice spoon",
          quantity: "2",
          unitPrice: "100"
        },
        {
          id: "f0dfdd81-a2d1-4b46-c7a8a-3f546b2386f1", 
          name: "Fork", 
          photo: "https://placehold.co/100",
          stockCode: "FRK-100", 
          description: "A silcer fork",
          quantity: "5",
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
    this.dataService.getAll(COLLECTION.QUOTES).forEach((quotes: any) => {
      console.log("quotes ", quotes);
      this.quotes = quotes;
    });
  }
  
  viewQuoteDetails(quote: Quote){
    this.editMode = true;
    this.editQuote = quote; 

  }

  downloadQuote(quote: Quote) {
    console.log("Download ", quote);
  }

  convetToPDF() {
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
      });
  }

}
