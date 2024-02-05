import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ROLE, ROUTES, STORAGE } from 'src/app/const/util';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class AppSideRegisterComponent {

  registrationError: string;
  sigupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,  Validators.minLength(6)]),
  });
  
  constructor( 
    private dataService: DataService, 
    private spinner: NgxSpinnerService,
    private router: Router) {}
  
  signup() {
    this.spinner.show();
    const formData = this.sigupForm.value;
    let user: User = {
      profilePhoto: "",
      email: formData.email as string,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      password: formData.password as string,
      role: ROLE.OPERATOR,
      gender: "",
      title: "",
      idNumber: "",
      phone: "",
      physicalAddress: ""
    };

    console.log(user);
    this.dataService.signup(user).subscribe(response => {
      console.log("Signup response ", response);
      this.dataService.setStorage(STORAGE.TOKEN, response.data.token);
      this.dataService.setStorage(STORAGE.USER, response.data.user);
      this.spinner.hide();
      this.router.navigateByUrl(ROUTES.DASHBOARD);
    }, err => {
      console.log(err);
      this.registrationError = err.error;
      this.spinner.hide();
    })
  }
}
