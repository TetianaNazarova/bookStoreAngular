import { Component, Inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import type { Book } from '../../services/book.service';
import { BookService } from '../../services/book.service';
import { MatButton } from '@angular/material/button'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.page.html',
  styleUrl: './book-details.page.scss',
  imports: [
    RouterOutlet,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ]),
  ],
})
export default class BookDetailsPage {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookDetailsPage>,
    private bookService: BookService
  ) {}

  deleteBook() {
    this.bookService.deleteBook(this.book.id);
    this.dialogRef.close();
  }
}
