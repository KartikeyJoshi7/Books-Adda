import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {

   }
  
   checkUser(email, password){
     return this.http.post('/api/signup/check',{
       u_email: email,
       u_password: password
     })
   }

   registerUser( name, college, phone, email, password){
     return this.http.post('/api/signup',{
      u_name: name,
      u_college: college,
      u_phone: phone,
      u_email: email,
      u_password: password
     })
   }
}
