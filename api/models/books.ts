import { Schema, model } from 'mongoose'
import genres from '../src/dict/genres'

interface IAuthor {
  firstName: string,
  lastName: string
}

interface IBook {
  title: string
  pages: number,
  publishDate?: Date,
  genre: string,
  coverImage: string,
  author: IAuthor
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now()
  },
  genre: {
    type: String,
    enum: genres,
    required: true
  },
  coverImage: {
    type: String
  },
  author: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  }
});

const Book = model<IBook>('Book', bookSchema)

export { IBook, IAuthor, bookSchema, Book }