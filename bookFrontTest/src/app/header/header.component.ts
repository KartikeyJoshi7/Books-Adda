import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../header.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private myHeader : HeaderService, private route: Router) { }
  
  user;
  ngOnInit() {
    this.myHeader.getUser().subscribe(data =>{
      if(data){
      console.log(data)
      this.user = data;
      }
    })
  }

  SignOut(){
    this.myHeader.logOutUser().subscribe(data =>{
      console.log(data);
    })
    this.route.navigate(['signin'])
  }

}
