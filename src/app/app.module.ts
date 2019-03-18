import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListViewComponent } from './book-list-view/book-list-view.component';
import { BookViewComponent } from './book-list-view/book-view/book-view.component';
import { BookFormComponent } from './book-list-view/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';


const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', component: BookListViewComponent },
  { path: 'books/create', component: BookFormComponent },
  { path: 'books/detail/:id', component: BookViewComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'auth/signup' }
];

export const appRouting = RouterModule.forRoot(routes);


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListViewComponent,
    BookViewComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuardService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
