import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { COLLECTION, GENDER, ROLE, ROUTES, STORAGE, TITLE } from 'src/app/const/util';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AppProfileComponent implements OnInit {

  user: User;
  editMode: boolean = false;
  userForm: any;
  userToBeEdited: User;

  titles = [
    TITLE.MR, TITLE.MRS, TITLE.MISS, TITLE.DR, TITLE.PROF  
  ];

  roles = [
    ROLE.ADMIN, ROLE.OPERATOR, ROLE.SUPERUSER 
  ];

  genders = [
    GENDER.MALE, GENDER.FEMALE, GENDER.NONBINARY
  ];
 

  constructor(private dataService: DataService, 
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.dataService.getStorage(STORAGE.USER);
    if(!this.user.email) {
      this.dataService.removeFromStorage(STORAGE.TOKEN);
      this.router.navigateByUrl(ROUTES.LOGIN);
    } 

    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      idNumber: ['', Validators.required],
      phone: ['', Validators.required],
      physicalAddress: ['', Validators.required],
    });
    

  }

  editProfile() {
    this.editMode = true;
    this.userToBeEdited = this.user;
    this.userForm.controls['firstName'].setValue(this.user.firstName);
    this.userForm.controls['lastName'].setValue(this.user.lastName);
    this.userForm.controls['title'].setValue(this.user.title);
    this.userForm.controls['gender'].setValue(this.user.gender);
    this.userForm.controls['idNumber'].setValue(this.user.idNumber);
    this.userForm.controls['role'].setValue(this.user.role);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['phone'].setValue(this.user.phone);
    this.userForm.controls['physicalAddress'].setValue(this.user.physicalAddress);
  }

  updateProfile() {
    console.log(this.userForm.value);
    const form = this.userForm.value;
    let newUser = {
      _id: this.user._id,
      password: this.user.password,
      email: this.user.email,
      firstName: form.firstName,
      lastName: form.lastName,
      idNumber: form.idNumber,
      gender: form.gender,
      title: form.title,
      role: form.role,
      phone: form.phone,
      physicalAddress: form.physicalAddress
    };

    console.log("User ", this.user);
    console.log("New User ", newUser);
    
    this.spinner.show();
    this.dataService.updateItem(newUser, COLLECTION.USERS).subscribe(res => {
      this.dataService.setStorage(STORAGE.USER, newUser);
      this.editMode = false;
      this.spinner.hide();
    }, err => {
      console.log('User error', err);
      this.spinner.hide();
      
    })
  }

  cancel() {
    this.editMode = false;
  }
}
