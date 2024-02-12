import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ROUTES, STORAGE } from 'src/app/const/util';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
 
  loginError: string;

  loginForm = new FormGroup({ 
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dataService: DataService) {
      
     }


  login() {
    this.spinner.show();
    this.dataService.login(this.loginForm.value).subscribe(response => {
      console.log("token ", response);
      this.dataService.setStorage(STORAGE.TOKEN, response.data.token);
      this.dataService.setStorage(STORAGE.USER, response.data.user);
      this.spinner.hide();
      this.router.navigateByUrl(ROUTES.DASHBOARD);
    }, err => {
      console.log("Error", err);
      this.loginError = err.error;
      this.spinner.hide();
      
    })
  }
}
