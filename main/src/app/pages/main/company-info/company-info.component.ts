import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, COMPANY_TYPE } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


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
 

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class AppCompanyInfoComponent {
  displayedColumns: string[] = ['companyLogo', 'contactPersonName', 
  'contactPersonPhoneNumber', 'contactPersonEmail', 'companyName', 'companyVATNumber', 'companyBillingAddress' ,'actionButton'];
  dataSource = ELEMENT_DATA;
  editMode: boolean = false;
  newCustomer: boolean = false;

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
 

  customerForm: any;
  customers: Customer[];

  constructor(
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService,
      @Inject(MAT_DIALOG_DATA) public data: {name: string},

     ) {
    // sales overview chart 
  }
  
  
  
  ngOnInit(): void {
    console.log("Data , ", this.data);
    if(this.data) {
      const customer: any = this.data;
      this.customerForm.controls['contactPersonTitle'].setValue(customer.contactPerson.title);
      this.customerForm.controls['contactPersonFirstName'].setValue(customer.contactPerson.firstName);
      this.customerForm.controls['contactPersonLastName'].setValue(customer.contactPerson.lastName);
      this.customerForm.controls['contactPersonEmail'].setValue(customer.contactPerson.emailAddress);
      this.customerForm.controls['contactPersonPhoneNumber'].setValue(customer.contactPerson.phoneNumber);
      this.customerForm.controls['companyName'].setValue(customer.name);
      this.customerForm.controls['companyVATNumber'].setValue(customer.VATNumber);
      this.customerForm.controls['companyBillingAddress'].setValue(customer.billingAddress);
      this.customerForm.controls['companyShippingAddress'].setValue(customer.shippingAddress);
    }
    // this.getCustomers();
    this.customerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyVATNumber: ['', [Validators.required]],
      contactPersonFirstName: ['', Validators.required],
      contactPersonLastName: ['', Validators.required],
      contactPersonEmail: ['', [Validators.required,  Validators.email]],
      contactPersonPhoneNumber: ['', Validators.required],
      contactPersonTitle: ['', Validators.required],
      companyBillingAddress: ['', Validators.required],
      companyShippingAddress: ['', Validators.required],
    });
  }

  copyShippingAddress(checked: any) {
    if(checked) {
      this.customerForm.controls['companyShippingAddress'].setValue(this.customerForm.get('companyBillingAddress').value);
    }
  }
  

  addCustomer() { 
    const form = this.customerForm.value;
    const customer: Customer = {
      id: "",
      url: form.url,
      type: COMPANY_TYPE.CUSTOMER,
      name: form.companyName,
      phoneNumber: "",
      emailAddress: "",
      VATNumber: form.companyVATNumber,
      registrationNumber: "",
      billingAddress: form.companyBillingAddress,
      shippingAddress: form.companyShippingAddress,
      contactPerson: {
        firstName: form.contactPersonFirstName,
        lastName: form.contactPersonLastName,
        emailAddress: form.contactPersonEmail,
        phoneNumber: form.contactPersonPhoneNumber,
        title: form.contactPersonTitle,
        gender: ""
      },
      bankDetails: {
        accountNumber: form.accountNumber,
        branchCode: form.branchCode,
        branchName: form.branchName
      },
      dateCreated: "" + new Date().getTime(),
      createdBy: "Donald Kgomo", 
      updatedOn: "" + new Date().getTime(),
      updatedBy: "Donald Kgomo"
    }

    if(this.newCustomer) {
      customer.id = uuid();
      this.dataService.addItem(customer, COLLECTION.CUSTOMERS).forEach((res: any) => {
        console.log("Customer added successfully ", res);
        this.editMode = false;
        this.getCustomers();
      });
    } else {
      customer.id = this.editCustomer.id,
      this.dataService.updateItem(customer, COLLECTION.CUSTOMERS).forEach((res: any) => {
        console.log("Customer updated successfully ", res);
        this.editMode = false;
        this.getCustomers();
      }); 
    }
  }

  addNewCustomer() {
    this.editMode = true;
    this.newCustomer = true;
  }
 
  cancelEditCustomer() {
    this.editMode = false;
  }

  getCustomers() {
    this.dataService.getAll(COLLECTION.CUSTOMERS).forEach((customers: any) => {
      console.log("customers ", customers);
      this.customers = customers;
    });
  }
  
  editCustomerDetails(customer: Customer){
    this.editMode = true;
    this.editCustomer = customer;
    console.log("Edit ", customer);
 
    this.customerForm.controls['contactPersonTitle'].setValue(customer.contactPerson.title);
    this.customerForm.controls['contactPersonFirstName'].setValue(customer.contactPerson.firstName);
    this.customerForm.controls['contactPersonLastName'].setValue(customer.contactPerson.lastName);
    this.customerForm.controls['contactPersonEmail'].setValue(customer.contactPerson.emailAddress);
    this.customerForm.controls['contactPersonPhoneNumber'].setValue(customer.contactPerson.phoneNumber);
    this.customerForm.controls['companyName'].setValue(customer.name);
    this.customerForm.controls['companyVATNumber'].setValue(customer.VATNumber);
    this.customerForm.controls['companyBillingAddress'].setValue(customer.billingAddress);
    this.customerForm.controls['companyShippingAddress'].setValue(customer.shippingAddress);

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
