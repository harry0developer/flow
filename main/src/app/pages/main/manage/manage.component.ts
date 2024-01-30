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
  newCompany: boolean = false;

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

      contactPersonFirstName: ['', Validators.required],
      contactPersonLastName: ['', Validators.required],
      contactPersonEmail: ['', [Validators.required,  Validators.email]],
      contactPersonPhoneNumber: ['', Validators.required],
      contactPersonTitle: ['', Validators.required],
      contactPersonGender: ['', Validators.required],

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
      id: "",
      logo: "https://placehold.co/200",
      name: form.name,
      registrationNumber: form.registrationNumber,
      VATNumber: form.VATNumber,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      website: form.website,
      billingAddress: form.billingAddress,
      shippingAddress: form.shippingAddress,
      contactPerson: {
        firstName: form.contactPersonFirstName,
        lastName: form.contactPersonLastName,
        emailAddress: form.contactPersonEmail,
        phoneNumber: form.contactPersonPhoneNumber,
        title: form.contactPersonTitle,
        gender: form.contactPersonGender,
      },
      bankDetails: {
        accountNumber: form.accountNumber,
        branchCode: form.branchCode,
        bankName: form.bankName,
      },
      createdOn: "" + new Date().getTime(),
      createdBy: "Donald Kgomo", 
      updatedOn: "" + new Date().getTime(),
      updatedBy: "Donald Kgomo"
    }

    if(this.newCompany) {
      company.id = uuid();
      this.dataService.addItem(company, COLLECTION.MY_COMPANIES).forEach((res: any) => {
        console.log("Customer added successfully ", res);
        this.editMode = false;
        this.getCompanies();
      });
      console.log("Comapny ", company);
      
    } else {
      company.id = this.editCompany.id,
      this.dataService.updateItem(company, COLLECTION.MY_COMPANIES).forEach((res: any) => {
        console.log("Customer updated successfully ", res);
        this.editMode = false;
        this.getCompanies();
      }); 
    }
  }

  addNewCompany() {
    this.editMode = true;
    this.newCompany = true;
  }
 
  cancel() {
    this.editMode = false;
  }

  getCompanies() {
    this.dataService.getAll(COLLECTION.MY_COMPANIES).forEach((company: any) => {
      console.log("company ", company);
      this.company = company;
    });
  }
  
  editCompanyDetails(company: Company){
    this.editMode = true;
    this.editCompany = company;
    console.log("Edit ", company);
    this.companyForm.controls['name'].setValue(company.name);
    this.companyForm.controls['emailAddress'].setValue(company.emailAddress);
    this.companyForm.controls['website'].setValue(company.website);
    this.companyForm.controls['phoneNumber'].setValue(company.phoneNumber);
    this.companyForm.controls['VATNumber'].setValue(company.VATNumber);
    
    this.companyForm.controls['contactPersonTitle'].setValue(company.contactPerson.title);
    this.companyForm.controls['contactPersonGender'].setValue(company.contactPerson.gender);
    this.companyForm.controls['contactPersonFirstName'].setValue(company.contactPerson.firstName);
    this.companyForm.controls['contactPersonLastName'].setValue(company.contactPerson.lastName);
    this.companyForm.controls['contactPersonEmail'].setValue(company.contactPerson.emailAddress);
    this.companyForm.controls['contactPersonPhoneNumber'].setValue(company.contactPerson.phoneNumber);
    this.companyForm.controls['registrationNumber'].setValue(company.registrationNumber);

    this.companyForm.controls['accountNumber'].setValue(company.bankDetails.accountNumber);
    this.companyForm.controls['bankName'].setValue(company.bankDetails.bankName);
    this.companyForm.controls['branchCode'].setValue(company.bankDetails.branchCode);

    this.companyForm.controls['billingAddress'].setValue(company.billingAddress);
    this.companyForm.controls['shippingAddress'].setValue(company.shippingAddress);
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
