import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get('/api/home')
  }

  logOutUser(){
    return this.http.get('/api/home/logout')
  }

  }
