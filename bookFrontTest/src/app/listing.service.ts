import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  
  getBooks(){
    return this.http.get('/api/upload')
  }

  getUserBooks(name){
    return this.http.post('/api/upload/seller',{
      u_name : name
    })
  }

  getSearchBooks(b_search, searchBy){
    return this.http.post('/api/upload/search',{
      b_search: b_search,
      searchBy : searchBy
    })
  }
  filterByPrice(priceval){
    return this.http.post('/api/upload/price',{
      priceval : priceval 
    })
  }
  filterByCondn(condnVal){
    return this.http.post('/api/upload/condition',{
      condnVal : condnVal
    })
  }

}
