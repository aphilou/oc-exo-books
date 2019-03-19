import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  book: Book;

  constructor(private bookService: BooksService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.book = new Book( '', '');
    const id: string = this.route.snapshot.params[ 'id' ];
    this.bookService.getBook( +id ).then(
      (item: Book) => {
        this.book = item;
      }
    );
  }

  onPrevious() {
    this.router.navigate([ '/books' ]);
  }
}
