import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookDetailService } from '../book-detail.service';
import { HeaderService } from '../header.service';
import { MessageService } from '../message.service';




@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  
  constructor(private route : ActivatedRoute, private myHeader : HeaderService, 
    private router : Router, private bookDetail: BookDetailService, private myMsg: MessageService ) { }
    myForm: FormGroup;

    public bookId;
    public Book;
    public user;
    public wish;
    
    ngOnInit() {

      this.myForm = new FormGroup({
        u_mesg: new FormControl(null, Validators.required)
  
      });

      //let id = this.route.snapshot.paramMap.get('id');  //vague approach
      this.route.paramMap.subscribe((params:ParamMap) =>{
        let id = parseInt(params.get('id'));
        this.bookId = id;
      })
      
      this.bookDetail.getBookDetail(this.bookId).subscribe(data =>{
        console.log(data); 
        this.Book = data;
      })
      
      this.myHeader.getUser().subscribe(data =>{
        if(data){
          console.log(data)
          this.user = data;
        }else{
          window.alert('Login again to continue!');
         // window.location.href = "/signin";
         this.router.navigate(['signin']);
        }
      })
    }
    
    sendMessage(event){
      event.preventDefault();
      const target = event.target
      const u_message = target.querySelector("#message").value;
      console.log(u_message);
      
      this.myMsg.sendMsg(this.user.name, this.Book[0], u_message).subscribe(data =>{
        if(data){
          console.log(data)
          window.alert("Mesage sent to " + this.Book[0].seller)
          target.querySelector("#message").value = ''
        }else{
          window.alert('Login again to continue!');
          this.router.navigate(['signin']);
        }
      })
    }
    
    addToWish(){
      this.bookDetail.addWishList(this.user.email, this.Book[0]).subscribe(data =>{
        this.wish = data
        console.log(this.wish.msg);
        if(this.wish.msg == "Added Book"){
          window.alert("Added " + this.wish.wishlist.bookName + " to wishlist.")
        }else if(this.wish.msg == "Already in Wishlist"){
          window.alert("Book already in Wishlist.")
        }
        else{
          window.alert('Login again to continue!');
          this.router.navigate(['signin']);
        }
      })
    }
    
  }
  