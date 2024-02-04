import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, GENDER, ROLE, TITLE } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/models/user';

const users: User[] =[
  { 
    firstName: "Tau",
    lastName: "Mogale",
    title: TITLE.MR,
    gender: GENDER.MALE,
    email: "tau@flow.com",
    phone: "0729003000",
    role: ROLE.OPERATOR,
    idNumber: "96010184000080",
    physicalAddress: "",
    username: "",
    password: ""
  },
  { 
    firstName: "Cecil",
    lastName: "Seleka",
    title: TITLE.MRS,
    gender: GENDER.FEMALE,
    email: "cecil@flow.com",
    phone: "0825003000",
    role: ROLE.OPERATOR,
    idNumber: "98010184000080",
    physicalAddress: "",
    username: "",
    password: ""
  },
  { 
    firstName: "Liah",
    lastName: "Thobela",
    title: TITLE.DR,
    gender: GENDER.FEMALE,
    email: "linah@flow.com",
    phone: "0847003000",
    role: ROLE.ADMIN,
    idNumber: "88010184000080",
    physicalAddress: "",
    username: "",
    password: ""
  }
];
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AppUsersComponent {
  displayedColumns: string[] = ['name','idNumber', 'gender', "email", "phone", "physicalAddress", "actionButton"];
  dataSource = users;
  editMode: boolean = false;
  newUser: boolean = false;
  editUser: User; 
  userForm: any;
  users: User[];

  titles = [
    TITLE.MR, TITLE.MRS, TITLE.MISS, TITLE.DR, TITLE.PROF  
  ];

  roles = [
    ROLE.ADMIN, ROLE.OPERATOR, ROLE.SUPERUSER 
  ];

  genders = [
    GENDER.MALE, GENDER.FEMALE, GENDER.NONBINARY
  ];

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
  }

 
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    this.getUsers();

    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      idNumber: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required,  Validators.email]],
      phone: ['', Validators.required],
      physicalAddress: ['', Validators.required],
    });
  } 

  addNewUser() {
    this.editMode = true;
    this.newUser = true;
  }
 
  cancelEditUser() {
    this.editMode = false;
  }

  addUser() { 
    const form = this.userForm.value;
    const user: User = {
      profilePhoto: form.profilePhoto,
      email: form.email,
      gender: form.gender,
      idNumber: form.idNumber,
      firstName: form.firstName,
      lastName: form.lastName,
      title: form.title,
      phone: form.phone,
      role: form.role,
      username: "",
      password: "",
      physicalAddress: form.physicalAddress,
      createdOn: "" + new Date().getTime(),
      createdBy: "Donald Kgomo", 
      updatedOn: "" + new Date().getTime(),
      updatedBy: "Donald Kgomo"
    }

    if(this.newUser) {
      this.dataService.addItem(user, COLLECTION.USERS).forEach((res: any) => {
        console.log("user added successfully ", res);
        this.editMode = false;
        this.getUsers();
      });
    } else {
      console.log("Update user", user);
      
      this.dataService.updateItem(user, COLLECTION.USERS).forEach((res: any) => {
        console.log("User updated successfully ", res);
        this.editMode = false;
        this.getUsers();
      }); 
    }
  }


  getUsers() {
    this.dataService.getAll(COLLECTION.USERS).forEach((users: any) => {
      console.log("users ", users);
      this.users = users;
    });
  }
 
  
  editUserDetails(user: User){
    this.editMode = true;
    this.editUser = user;
    this.userForm.controls['firstName'].setValue(user.firstName);
    this.userForm.controls['lastName'].setValue(user.lastName);
    this.userForm.controls['title'].setValue(user.title);
    this.userForm.controls['gender'].setValue(user.gender);
    this.userForm.controls['idNumber'].setValue(user.idNumber);
    this.userForm.controls['role'].setValue(user.role);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['phone'].setValue(user.phone);
    this.userForm.controls['physicalAddress'].setValue(user.physicalAddress);
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
