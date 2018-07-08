import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { MessageService } from '../message.service';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  constructor(private myHeader : HeaderService, private router: Router, private myMsg : MessageService, private myList : ListingService) { }
  public user;
  public userBooks;
  public bookMsgs = [];
  ngOnInit() {
    this.myHeader.getUser().subscribe(data =>{
      if(data){
        
        console.log(data)
        this.user = data;
        console.log(this.user.email)
        
        this.myList.getUserBooks(this.user.name).subscribe(data => {
          console.log(data)
          if(data){
            this.userBooks = data;
          }
          
          for(var book of this.userBooks){
            // console.log(book.bookName)
            this.myMsg.getMsg(book.bookName).subscribe(data =>{
              console.log(data)
              this.bookMsgs.push(data)
              console.log(this.bookMsgs)
            })
          }
        })

      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    }) 
  }
  
}
