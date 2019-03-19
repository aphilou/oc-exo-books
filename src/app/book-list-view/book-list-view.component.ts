import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list-view',
  templateUrl: './book-list-view.component.html',
  styleUrls: ['./book-list-view.component.scss']
})
export class BookListViewComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  onCreateBook() {
    this.router.navigate([ '/books', 'create']);
  }

  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate([ '/books', 'detail', id ]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.bookSubscription.unsubscribe();
  }
}
