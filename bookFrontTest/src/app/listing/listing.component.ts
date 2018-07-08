import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  
  constructor(private myList:ListingService, private myHeader : HeaderService , private router : Router ) { }
  
  books;
  user;
  searchBy;
  ngOnInit() {
    this.myHeader.getUser().subscribe(data =>{
      if(data){
        console.log(data)
        this.user = data;
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
    
    this.myList.getBooks().subscribe(data =>{
      console.log(data); 
      this.books = data;
    })
  }
  
  SignOut(){
    this.myHeader.logOutUser().subscribe(data =>{
      console.log(data);
    })
    this.router.navigate(['signin'])
  }
  
  whichBtn(searchType){
    console.log('type ' + searchType)
    this.searchBy = searchType;
  }
  
  searchBook(event){
    event.preventDefault();
    const target = event.target
    const b_search = target.querySelector("#searchBox").value;
    console.log(b_search);
    
    this.myList.getSearchBooks(b_search, this.searchBy).subscribe(data =>{
      if(data){
        console.log(data); 
        this.books = data;
        target.querySelector("#searchBox").value = ''
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
  }
  
  filterPrice(Fprice){
    console.log('filter by : ' + Fprice);
    this.myList.filterByPrice(Fprice).subscribe(data => {
      if(data){
        console.log(data);
        this.books = data;
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
  }
  
  filterByCondn(Fcondn){
    console.log('filter by : ' + Fcondn);
    this.myList.filterByCondn(Fcondn).subscribe(data => {
      if(data){
        console.log(data);
        this.books = data;
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
  }
  
  
  onSelect(selectedBook){
    this.router.navigate(['/listing',selectedBook.id])
    
  }
}
