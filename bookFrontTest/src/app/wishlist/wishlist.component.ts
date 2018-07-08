import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  constructor( private myHeader : HeaderService, private router: Router, private myWish : WishlistService) { }
  
  public user;
  public WishBooks;
  
  ngOnInit() {
    
    this.myHeader.getUser().subscribe(data =>{
      if(data){
        console.log(data)
        this.user = data;
        console.log(this.user.email)
        
        this.myWish.myWishList(this.user.email).subscribe(data => {
          console.log(data)
          this.WishBooks = data;
        })
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })     
  }
  
  deleteWish(b_user, b_name, ba_name){
    console.log('Book user ' + b_user, 'Book name ' + b_name, ' Author name ' + ba_name);
    this.myWish.deleteWish(b_user, b_name, ba_name).subscribe(data => {
      if(data){
        console.log(data);
        window.alert('Book removed from Wishlist!');
        window.location.href = "/wishlist"
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
  }
  
}
