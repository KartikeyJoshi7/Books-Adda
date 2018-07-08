import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(private http: HttpClient) { }

  sendMsg(u_email, book, u_message ){
    console.log(book.seller)
    console.log(u_email)
    return this.http.post('/api/message',{
      m_reciever: book.seller,
      m_sender : u_email,
      m_bookName : book.bookName,
      m_message :u_message
    })
  }

  getMsg(bookname){
    //console.log('service' +bookname)
    return this.http.post('/api/message/book',{
      b_name : bookname
    })
  }
}
