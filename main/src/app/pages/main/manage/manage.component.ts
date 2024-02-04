import { Component } from '@angular/core'; 
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, GENDER, TITLE } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";
import { Company } from 'src/app/models/company';
 
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class AppManageComponent {
  displayedColumns: string[] = ['companyLogo', 'contactPersonName', 
  'contactPersonPhoneNumber', 'contactPersonEmail', 'companyName', 
  'companyVATNumber', 'companyBillingAddress' ,'actionButton'];
  editMode: boolean = false;
  isNewCompany: boolean = false;

  editCompany: Company;
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
  
  companyForm: any;
  company: Company[];

  constructor(
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
    // sales overview chart 
  }

 
  ngOnInit(): void {

    this.getCompanies(); 
   

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      VATNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      billingAddress: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      website: [''],
      phoneNumber: ['', Validators.required],
      emailAddress:  ['', [Validators.required,  Validators.email]],

      // contactPersonId: ['', Validators.required], 

      accountNumber:  ['', Validators.required],
      branchCode:  ['', Validators.required],
      bankName:  ['', Validators.required],
    });
  }

  copyShippingAddress(checked: any) {
    if(checked) {
      this.companyForm.controls['shippingAddress'].setValue(this.companyForm.get('billingAddress').value);
    }
  } 


  
  addCompany() { 
    const form = this.companyForm.value;
    const company: Company = {
      photo: "https://placehold.co/200",
      name: form.name,
      registrationNumber: form.registrationNumber,
      VATNumber: form.VATNumber,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      website: form.website,
      billingAddress: form.billingAddress,
      shippingAddress: form.shippingAddress,
      contactPersonId: "65bfd1a6965711aa24e06f79",//form.contactPersonId,
      bankDetails: {
        accountNumber: form.accountNumber,
        branchCode: form.branchCode,
        bankName: form.bankName,
      },
      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }

    this.dataService.addItem(company, COLLECTION.COMPANIES).forEach((res: any) => {
      console.log("Customer added successfully ", res);
      this.editMode = false;
      this.getCompanies();
    });      
    
  }

  updateCompany() { 
    const form = this.companyForm.value;
    const company: Company = {
      _id: this.editCompany._id,
      photo: "https://placehold.co/200",
      name: form.name,
      registrationNumber: form.registrationNumber,
      VATNumber: form.VATNumber,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      website: form.website,
      billingAddress: form.billingAddress,
      shippingAddress: form.shippingAddress,
      contactPersonId: "65bfd1a6965711aa24e06f79",//form.contactPersonId,
      bankDetails: {
        accountNumber: form.accountNumber,
        branchCode: form.branchCode,
        bankName: form.bankName,
      },
      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }

 
    this.dataService.updateItem(company, COLLECTION.COMPANIES).forEach((res: any) => {
      console.log("Customer updated successfully ", res);
      this.editMode = false;
      this.getCompanies();
    }); 
    
  }

  saveCompany() {
    if(this.isNewCompany) {
      this.addCompany()
    } else {
      this.updateCompany();
    }
  }

  addNewCompany() {
    this.editMode = true;
    this.isNewCompany = true;
  }
 
  cancel() {
    this.editMode = false;
  }

  getCompanies() {
    this.dataService.getAll(COLLECTION.COMPANIES).forEach((company: any) => {
      console.log("company ", company);
      this.company = company;
    });
  }
  
  editCompanyDetails(company: Company){
    this.editMode = true;
    this.editCompany = company;
    this.isNewCompany = false;
    console.log("Edit address ", company);
    this.companyForm.controls['name'].setValue(company.name);
    this.companyForm.controls['emailAddress'].setValue(company.emailAddress);
    this.companyForm.controls['website'].setValue(company.website);
    this.companyForm.controls['phoneNumber'].setValue(company.phoneNumber);
    this.companyForm.controls['VATNumber'].setValue(company.VATNumber);

    this.companyForm.controls['registrationNumber'].setValue(company.registrationNumber);

    this.companyForm.controls['accountNumber'].setValue(company.bankDetails.accountNumber);
    this.companyForm.controls['bankName'].setValue(company.bankDetails.bankName);
    this.companyForm.controls['branchCode'].setValue(company.bankDetails.branchCode);

    this.companyForm.controls['billingAddress'].setValue(company.billingAddress);
    this.companyForm.controls['shippingAddress'].setValue(company.shippingAddress);
  }
}
