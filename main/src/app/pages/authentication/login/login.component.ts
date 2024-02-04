import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataService: DataService) {
 }
  ngOnInit(): void {   
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.dataService.login(this.loginForm.value).subscribe(res => {
      console.log("token ", res);
      
    })
  }
}
