import { ChangeDetectorRef, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Book, BookService } from '../../services/book.service'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import BookDetailsPage from '../book-details/book-details.page'
import { MatFormField } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInput, MatInputModule } from '@angular/material/input'
import { BookFormPage } from '../book-form/book-form.page'
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    FormsModule,
    MatInput,
    MatCardModule,
    MatInputModule,
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './list-book.page.html',
  styleUrl: './list-book.page.scss',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export default class ListBookPage {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery = '';

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef,
  ) {
    this.books = this.bookService.getBooks();
    this.filteredBooks = [...this.books];
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
    this.filteredBooks = this.bookService.getBooks();
  }

  openDetails(book: Book) {
    this.dialog.open(BookDetailsPage, { width: '500px', data: book }).afterClosed().subscribe(() => {
      this.filteredBooks = this.bookService.getBooks();
      this.changeDetector.detectChanges();
    });
  }

  openAddForm() {
    this.dialog.open(BookFormPage, { width: '500px' }).afterClosed().subscribe(() => {
      this.filteredBooks = this.bookService.getBooks();
      this.changeDetector.detectChanges();
    });
  }

  openEditForm(book: Book) {
    this.dialog.open(BookFormPage, { width: '500px', data: book }).afterClosed().subscribe(() => {
      this.filteredBooks = this.bookService.getBooks();
      this.changeDetector.detectChanges();
    });
  }
}
