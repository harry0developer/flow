import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION, GENDER, ROLE, TITLE } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/models/user'; 
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AppUsersComponent {
  displayedColumns: string[] = ['name','idNumber', 'gender', "email", "phone", "physicalAddress", "actionButton"];
  editMode: boolean = false;
  isNewUser: boolean = false;
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
     private dataService: DataService,) {  }

 
  ngOnInit(): void {
 
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
    this.isNewUser = true;
  }
 
  cancelEditUser() {
    this.editMode = false;
  }

 
  updateUser() { 
    const form = this.userForm.value;
    const user: User = {
      _id: this.editUser._id,
      profilePhoto: form.profilePhoto,
      email: this.editUser.email,
      gender: form.gender,
      idNumber: form.idNumber,
      firstName: form.firstName,
      lastName: form.lastName,
      title: form.title,
      phone: form.phone,
      role: form.role,
      password: "",
      physicalAddress: form.physicalAddress
    } 

    this.dataService.updateItem(user, COLLECTION.USERS).forEach((res: any) => {
      console.log("User updated successfully ", res);
      this.editMode = false;
      this.getUsers();
    }); 
 
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
      password: "",
      physicalAddress: form.physicalAddress

    }
 
    this.dataService.addItem(user, COLLECTION.USERS).forEach((res: any) => {
      console.log("user added successfully ", res);
      this.editMode = false;
      this.getUsers();
    });
     
  }

  saveUser() {
    if(this.isNewUser) {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  getUsers() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.USERS).forEach((users: any) => {
      console.log("users ", users);
      this.users = users;
      this.spinner.hide();
    }).catch(err => {
      this.spinner.hide();
    })
  }
 
  
  editUserDetails(user: User){
    this.editMode = true;
    this.editUser = user;
    this.isNewUser = false;
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

}
