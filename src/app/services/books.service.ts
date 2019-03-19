import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.bookSubject.next(this.books.slice());
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on( 'value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            console.log('From DB: book', data.val());
            resolve(data.val());
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    );
  }

  createBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (item) => {
        if (item === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
