import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private mySignupService: SignupService, private router: Router) { }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      u_name: new FormControl(null, Validators.required),
      u_college: new FormControl(null, Validators.required),
      u_phone: new FormControl(null, Validators.required),
      u_email: new FormControl(null, Validators.required),
      u_password: new FormControl(null, Validators.required)
    });
  }
  
  signupSubmit(event){
    event.preventDefault();
    const target = event.target
    const u_name = target.querySelector("#u_name").value;
    const u_college = target.querySelector("#u_college").value;
    const u_phone = target.querySelector("#u_phone").value;
    const u_email = target.querySelector("#u_email").value;
    const u_password = target.querySelector("#u_password").value;
    
    this.mySignupService.registerUser(u_name, u_college, u_phone, u_email, u_password).subscribe(data =>{
      if(data){
        this.router.navigate(['signin']);
      }
      else{
        window.alert('Email already exists!');
        window.location.href = "/";
      }
    })
  }
  
}
