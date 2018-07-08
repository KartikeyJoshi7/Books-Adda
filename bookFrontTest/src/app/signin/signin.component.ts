import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Router} from '@angular/router';

import { SignupService } from '../signup.service';
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  myForm: FormGroup;
  
  constructor(private mySignInService: SignupService, private myHeader: HeaderService,  private router: Router) { }
  
  
  ngOnInit() {

    this.myHeader.getUser().subscribe(data =>{
      if(data){
        console.log(data)
        this.router.navigate(['listing']);
      }
    })

    this.myForm = new FormGroup({
      u_email: new FormControl(null, Validators.required),
      u_password: new FormControl(null, Validators.required)
    });
  }
  
  
  
  signInSubmit(event){
    event.preventDefault();
    const target = event.target
    const u_email = target.querySelector("#u_email").value;
    const u_password = target.querySelector("#u_password").value;
    
    this.mySignInService.checkUser(u_email, u_password).subscribe(data =>{
      console.log(data)
      if(data){
        this.router.navigate(['listing']);
      }
      else{
        window.alert('Invalid credentials!');
        
        window.location.href = "/signin";
        // console.log('hi');
        
      }
      
    })
  }
  
}
