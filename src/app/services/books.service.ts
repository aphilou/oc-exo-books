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
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch (
        (error) => {
          console.error('Fichier non trouvé : ', error);
        }
      );
    }
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

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement en cours...');
          },
          (error: any) => {
            console.error('Erreur de chargement: ', error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
