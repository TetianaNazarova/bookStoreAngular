import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Book, BookService } from '../../services/book.service'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { MatInput, MatInputModule } from '@angular/material/input'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    NgIf,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './book-form.page.html',
  styleUrl: './book-form.page.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class BookFormPage {
  bookForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookFormPage>,
    @Inject(MAT_DIALOG_DATA) public data: Book | null
  ) {
    this.isEditMode = !!data;
    this.bookForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      author: [data?.author || '', [Validators.required]],
      year: [data?.year || '', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      description: [data?.description || '', [Validators.required]],
      coverImageUrl: [data?.coverImageUrl || '', [Validators.pattern('https?://.+')]],
    });
  }

  save() {
    if (this.bookForm.valid) {
      const book: Book = { ...this.data, ...this.bookForm.value };
      if (this.isEditMode) {
        this.bookService.updateBook(book);
      } else {
        this.bookService.addBook(book);
      }
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
