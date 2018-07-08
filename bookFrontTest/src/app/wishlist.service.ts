import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private http: HttpClient) { }

  myWishList( email ){
    return this.http.post('/api/addWishList/wish',{
      u_email : email
    })
  }
  deleteWish(b_user, b_name, ba_name){
    return this.http.post('/api/addWishList/delete',{
      u_email : b_user,
      book_name : b_name,
      author_name : ba_name
    })
  }
}
