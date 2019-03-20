import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router, Event } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: [ '', Validators.required],
      author: [ '', Validators.required]
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const bookToAdd = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '') {
      bookToAdd.photo = this.fileUrl;
    }
    this.bookService.createBook(bookToAdd);
    this.router.navigate([ '/books' ]);
  }

  onUploadFile(file: File) {
    this.fileUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileUploaded = true;
        this.fileUploading = false;
      }
    );
  }

  onEvent(event: any) {
    this.onUploadFile(event.target.files[0]);
  }
}
