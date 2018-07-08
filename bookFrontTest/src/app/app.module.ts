//modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//components

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { ListingComponent } from './listing/listing.component';
import { SigninComponent } from './signin/signin.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MessageComponent } from './message/message.component';
import { EntryComponent } from './entry/entry.component';


//services

import { SignupService } from './signup.service';
import { HeaderService } from './header.service';
import { ListingService } from './listing.service';
import { AddBookService } from './add-book.service';
import { BookDetailService } from './book-detail.service';
import { WishlistService } from './wishlist.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    ListingComponent,
    SigninComponent,
    AddBooksComponent,
    BookDetailComponent,
    WishlistComponent,
    MessageComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'listing/add',
        component: AddBooksComponent
      },
      {
        path: 'listing/:id',
        component: BookDetailComponent
      },
      {
        path: 'listing',
        component: ListingComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'messages',
        component: MessageComponent
      },
      {
        path: '',
        component: EntryComponent
      }
      
    ])
  ],
  providers: [SignupService, HeaderService, ListingService, AddBookService, BookDetailService,
                 WishlistService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
