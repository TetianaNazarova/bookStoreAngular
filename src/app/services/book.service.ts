import { Injectable } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  coverImageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: 1960,
      description: 'A novel about the serious issues of racial inequality, told through the eyes of a child in the Deep South.',
      coverImageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      description: 'A dystopian novel set in a totalitarian regime that uses surveillance and propaganda to oppress its citizens.',
      coverImageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      year: 1813,
      description: 'A romantic novel that also critiques the societal norms of marriage and wealth in 19th-century England.',
      coverImageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      description: 'A story of love, wealth, and betrayal set in the Jazz Age, exploring the American Dream and its disillusionment.',
      coverImageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: 'Moby Dick',
      author: 'Herman Melville',
      year: 1851,
      description: 'An epic tale of a whaling ship captain obsessed with hunting a giant white whale.',
      coverImageUrl: 'https://via.placeholder.com/150',
    }
  ];

  getBooks() {
    return [...this.books];
  }

  addBook(book: Book) {
    book.id = this.books.length ? Math.max(...this.books.map((b) => b.id)) + 1 : 1;
    this.books.push(book);
  }

  updateBook(updatedBook: Book) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  deleteBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
