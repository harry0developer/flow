import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/const/util';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuid} from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class AppSideRegisterComponent {
  constructor(private router: Router, private dataService: DataService) {}
  errors: string;
  sigupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    lastName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });

  
  signup() {
    const formData = this.sigupForm.value;
    let user: User = {
      id: uuid(),
      profilePhoto: "",
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      gender: "",
      title: "",
      idNo: "",
      email: "",
      phone: "",
      role: ROLE.OPERATOR,
      physicalAddress: "",
      username: formData.username as string,
      password: formData.password as string,
      createdOn: "",
      createdBy: "", 
      updatedOn: "",
      updatedBy: ""
    };

    console.log(user);
    this.findUsername(user.username)
  }

  findUsername(username: string) {
    this.dataService.findUsername(username).forEach((res: any) => {
      if(res.length > 0) {
        this.errors = "Username already registered";
        //signup
      } else {
        console.log("create account");
      }
    })
  }
}
