import { Component, ViewEncapsulation, ViewChild } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Customer } from 'src/app/models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION } from 'src/app/const/util';
 

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    url: 'assets/images/customers/customer-1.svg',
    customerName: "Nkanyesi Shobe",
    customerEmail: "nkanyi@beamlight.com",
    customerPhoneNumber: "0112004000",
    companyName: "BeamLight Corp",
    companyVATNumber: "400080000",
    companyPhysicalAddress: "100 Mandela Drive, Brynston, Sandton, 2100",
    customerType: "Business;"
  },
  {
    id: 2,
    url: 'assets/images/customers/customer-2.svg',
    customerName: "Linah Kgomo",
    customerEmail: "linah@ballnet.com",
    customerPhoneNumber: "0215557000",
    companyName: "BallNet",
    companyVATNumber: "555000555",
    companyPhysicalAddress: "222 Peter Mokaba str, Century Ciry, Cape town, 6065",
    customerType: "Business"
  },
  {
    id: 3,
    url: 'assets/images/customers/customer-3.svg',
    customerName: "Donald Cow",
    customerEmail: "donald@sqrm.com",
    customerPhoneNumber: "0120005555",
    companyName: "SQR Mining",
    companyVATNumber: "7000011",
    companyPhysicalAddress: "501 Main str, Sunnyside, Pretoria, 8000",
    customerType: "Business"
  },
  {
    id: 4,
    url: 'assets/images/customers/customer-4.svg',
    customerName: "Thiko Stati",
    customerEmail: "thiko@stonecorp.com",
    customerPhoneNumber: "0119997000",
    companyName: "Stone Corp",
    companyVATNumber: "88800000",
    companyPhysicalAddress: "900 main str, newtown, Johannesburg, 9000",
    customerType: "Business"
  },
  
];

export interface Item {
  stockCode: string;
  description: string;
  qty: string;
  unitPrice: string;
  vat: string;
  totalPrice: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class AppCustomersComponent {
  displayedColumns: string[] = ['companyLogo','customerName', 'companyName', 'customerEmail', 
  'customerPhoneNumber', 'companyVATNumber', 'companyBillingAddress', 'actionButton'];
  dataSource = ELEMENT_DATA;
  editMode: boolean = false;
  editCustomer: Customer;
  total = {
    totalPriceExcl: "120000",
    totalVat: "1200",
    totalPriceDiscount: "0",
    totalPriceInclusive: "121200"
  };
  
  
  titles = [
    "Mr.", "Mrs.", "Miss", "Ms.", "Dr.", "Prof." 
  ];
  tableInvoiceData: Item[] = [
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    },
    {
      stockCode: "DTG-1099",
      description: "Water pump",
      qty: "1",
      unitPrice: "660000",
      vat: "0",
      totalPrice: "660000",
    },
    {
      stockCode: "HDH-1099",
      description: "Saculent hinge for water pump holder",
      qty: "1",
      unitPrice: "4500",
      vat: "0",
      totalPrice: "45000",
    },
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    },
    {
      stockCode: "DTG-1099",
      description: "Water pump",
      qty: "1",
      unitPrice: "660000",
      vat: "0",
      totalPrice: "660000",
    },
    {
      stockCode: "HDH-1099",
      description: "Saculent hinge for water pump holder",
      qty: "1",
      unitPrice: "4500",
      vat: "0",
      totalPrice: "45000",
    },
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    },
    {
      stockCode: "DTG-1099",
      description: "Water pump",
      qty: "1",
      unitPrice: "660000",
      vat: "0",
      totalPrice: "660000",
    },
    {
      stockCode: "HDH-1099",
      description: "Saculent hinge for water pump holder",
      qty: "1",
      unitPrice: "4500",
      vat: "0",
      totalPrice: "45000",
    },
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    },
    {
      stockCode: "DTG-1099",
      description: "Water pump",
      qty: "1",
      unitPrice: "660000",
      vat: "0",
      totalPrice: "660000",
    },
    {
      stockCode: "HDH-1099",
      description: "Saculent hinge for water pump holder",
      qty: "1",
      unitPrice: "4500",
      vat: "0",
      totalPrice: "45000",
    }, 
  ];

  customers: Customer[];

  constructor(private router: Router,
     private activeRoute: ActivatedRoute,
     private dataService: DataService) {
    // sales overview chart 
  }

  ngOnInit(): void {
    this.getCustomers();
  }
 
  getCustomers() {
    this.dataService.getAll(COLLECTION.CUSTOMERS).subscribe((customers: any) => {
      console.log("customers ", customers);
      this.customers = customers;
    })
  }
  
  editCustomerDetails(customer: Customer){

    this.editMode = true;
    this.editCustomer = customer;
   // await this.router.navigate(['details', customer.id], { relativeTo: this.activeRoute });
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
