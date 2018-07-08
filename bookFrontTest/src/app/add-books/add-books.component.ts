import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



import { AddBookService } from '../add-book.service';
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  
  myForm: FormGroup;
  
  selectedFile: File = null;
  fd = new FormData();
  
  constructor(private bookService : AddBookService, private myHeader : HeaderService, private router : Router) { }
  
  user;
  ngOnInit() {
    this.myForm = new FormGroup({
      boo_name: new FormControl(null, Validators.required),
      autho_name: new FormControl(null, Validators.required),
      pric: new FormControl(null, Validators.required),
      conditio: new FormControl(null, Validators.required)
    });
    
    this.myHeader.getUser().subscribe(data =>{
      if(data){
        console.log(data)
        this.user = data;
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }
    })
  }
  
  book;
  bookSubmit(event){
    event.preventDefault();
    const target = event.target
    const book_name = target.querySelector("#book_name").value;
    const author_name = target.querySelector("#author_name").value;
    const price = target.querySelector("#price").value;
    const condition = target.querySelector("#condition").value;
    this.fd.append('book_name', book_name)
    this.fd.append('author_name', author_name)
    this.fd.append('price', price)
    this.fd.append('condition', condition)
    console.log('formdata' + this.fd);
    
    this.bookService.addBooks(this.fd).subscribe(data =>{
      console.log(data);
      this.book = data 
      if(data){
        window.alert("Added " + this.book.bookName + " to lists.")
        window.location.href = "/listing/add"
      }else{
        window.alert('Login again to continue!');
        this.router.navigate(['signin']);
      }         
    })
    
  }
  
  onFileSelected(event) {
    console.log(event);
    
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('bookimage', this.selectedFile, this.selectedFile.name);
    
  }
}