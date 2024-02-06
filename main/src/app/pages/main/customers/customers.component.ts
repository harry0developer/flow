import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, GENDER, TITLE } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class AppCustomersComponent {
  displayedColumns: string[] = ['logo', 'name', 'contactPersonName', 
  'phoneNumber', 'emailAddress', 'VATNumber','registrationNumber', 'billingAddress' ,'actionButton'];
  editMode: boolean = false;

  editCustomer: Customer;
  total = {
    totalPriceExcl: "120000",
    totalVat: "1200",
    totalPriceDiscount: "0",
    totalPriceInclusive: "121200"
  };
  
  
  titles = [
    TITLE.MR, TITLE.MRS, TITLE.MISS, TITLE.PROF, TITLE.DR 
  ];

  gender = [
    GENDER.MALE, GENDER.FEMALE, GENDER.NONBINARY
  ];
  

  customerForm: any;
  customers: Customer[] = [];

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
    // sales overview chart 
  }

 
  ngOnInit(): void {
    this.getCustomers();
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      VATNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required,  Validators.email]],
      phoneNumber: ['', Validators.required],
      billingAddress: ['', Validators.required],
      shippingAddress: ['', Validators.required],

      contactPersonFirstName: ['', Validators.required],
      contactPersonLastName: ['', Validators.required],
      contactPersonEmail: ['', [Validators.required,  Validators.email]],
      contactPersonPhoneNumber: ['', Validators.required],
      contactPersonTitle: ['', Validators.required],
      contactPersonGender: ['', Validators.required],
    });
  }

  copyShippingAddress(checked: any) {
    if(checked) {
      this.customerForm.controls['shippingAddress'].setValue(this.customerForm.get('billingAddress').value);
    }
  }

  getCustomerById(item: Customer) { 
    this.dataService.getById( COLLECTION.CUSTOMERS, item,).forEach((res: any) => {
      console.log("Customer updated successfully ", res);
    }); 
  }

  deleteCustomer() {
    this.dataService.delete(COLLECTION.CUSTOMERS, this.editCustomer,).forEach((res: any) => {
      console.log("Customer updated successfully ", res);
      this.editMode = false;
    }); 
  }
  
  updateCustomer() {
    const form = this.customerForm.value;
    const customer: Customer = {
      _id: this.editCustomer._id,
      registrationNumber: form.registrationNumber,
      name: form.name,
      VATNumber: form.VATNumber,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      billingAddress: form.billingAddress,
      shippingAddress: form.shippingAddress,
      contactPerson: {
        firstName: form.contactPersonFirstName,
        lastName: form.contactPersonLastName,
        emailAddress: form.contactPersonEmail,
        phoneNumber: form.contactPersonPhoneNumber,
        title: form.contactPersonTitle,
        gender: form.contactPersonGender
      },

      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }

    console.log("Addding ", customer);
 
    this.dataService.updateItem(customer, COLLECTION.CUSTOMERS).forEach((res: any) => {
      console.log("Customer updated successfully ", res);
      this.editMode = false;
      this.getCustomers();
    }); 
  
  }

  addCustomer() { 
    const form = this.customerForm.value;
    const customer: Customer = {
      registrationNumber: form.registrationNumber,
      name: form.name,
      VATNumber: form.VATNumber,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      billingAddress: form.billingAddress,
      shippingAddress: form.shippingAddress,
      contactPerson: {
        firstName: form.contactPersonFirstName,
        lastName: form.contactPersonLastName,
        emailAddress: form.contactPersonEmail,
        phoneNumber: form.contactPersonPhoneNumber,
        title: form.contactPersonTitle,
        gender: form.contactPersonGender
      },

      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }
    
    this.dataService.addItem(customer, COLLECTION.CUSTOMERS).forEach((res: any) => {
      console.log("Customer added successfully ", res);
      this.editMode = false;
      this.getCustomers();
    });
    
  }

  addNewCustomer() {
    this.editMode = true;
    this.customerForm.reset()
  }
 
  cancel() {
    this.editMode = false;
  }

  getCustomers() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.CUSTOMERS).subscribe((customers: any) => {
      console.log("customers ", customers);
      this.customers = customers;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
  
  editCustomerDetails(customer: Customer){
    this.editMode = true;
    this.editCustomer = customer;
    console.log("Edit ", customer); 
    this.customerForm.controls['name'].setValue(customer.name);
    this.customerForm.controls['VATNumber'].setValue(customer.VATNumber);
    this.customerForm.controls['registrationNumber'].setValue(customer.registrationNumber);
    this.customerForm.controls['emailAddress'].setValue(customer.emailAddress);
    this.customerForm.controls['phoneNumber'].setValue(customer.phoneNumber);
    this.customerForm.controls['billingAddress'].setValue(customer.billingAddress);
    this.customerForm.controls['shippingAddress'].setValue(customer.shippingAddress);
    this.customerForm.controls['contactPersonFirstName'].setValue(customer.contactPerson.firstName);
    this.customerForm.controls['contactPersonLastName'].setValue(customer.contactPerson.lastName);
    this.customerForm.controls['contactPersonEmail'].setValue(customer.contactPerson.emailAddress);
    this.customerForm.controls['contactPersonPhoneNumber'].setValue(customer.contactPerson.phoneNumber);
    this.customerForm.controls['contactPersonTitle'].setValue(customer.contactPerson.title);
    this.customerForm.controls['contactPersonGender'].setValue(customer.contactPerson.gender);
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
