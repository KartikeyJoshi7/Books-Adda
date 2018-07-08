import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  
  constructor(private http : HttpClient) { }
  
  addBooks(formdata){
    return this.http.post('/api/upload', formdata);
  }
  
}
