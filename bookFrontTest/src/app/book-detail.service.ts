import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookDetailService {
  
  constructor(private http: HttpClient) { }
  
  getBookDetail(bookId){
    return this.http.post('/api/upload/item',{
      bookId : parseInt(bookId)
    })
  }
  
  addWishList(u_email, book){
    return this.http.post('/api/addWishList',{
      u_email : u_email,
      seller : book.seller,
      book_name : book.bookName,
      author_name: book.authorName,
      price: parseInt(book.price),
      image: book.image,
      condition : book.condition
    })
    
  }
}
