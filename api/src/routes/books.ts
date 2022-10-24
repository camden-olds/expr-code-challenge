import express, { Request, Response, NextFunction } from 'express'
import pageable from '../middleware/pageable'
import validateId from '../middleware/validateId'
import { IBook, Book } from '../../models/books'
import genres from '../dict/genres'

const router = express.Router()


/**
 * Returns a list of available genres for use in assigning the frontend
 * GET /books/genres
 */
router.get('/books/genres', (req: Request, res: Response) => {
  return res.status(200).send(genres)
})


/**
 * GET /books
 */
router.get('/books', pageable, async (req: Request, res: Response) => {
  const count = await Book.count({})
  const books = await Book.find({})
                          .limit(req.body.pagination.perPage)
                          .skip(req.body.pagination.offset)

  return res.status(200).send({
    items: books,
    totalItems: count,
    perPage: req.body.pagination.perPage,
    page: req.body.pagination.page
  })
})



/**
 * @route POST /books
 */
type NewBookRequest = Request & {body: IBook}
router.post('/books', async (req: NewBookRequest, res: Response, next: NextFunction) => {
  const postBody:IBook = req.body

  try {
    const book = await Book.create(postBody)
    res.status(201).send(book)
  } catch (err: any) {
    next(err)
  }
})


/**
 * @route GET /books/:id
 */
router.get('/books/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {

  const book = await Book.findById(req.params.id)
  if(book) {
    res.status(200).send(book)
    return
  }
  res.status(404).send({message:'Not Found'})

})


/**
 * @route PUT /books/:id
 */
router.put('/books/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const postBody:IBook = req.body

  const id = req.params.id

  let result
  try {
    result = await Book.replaceOne({ _id: id }, postBody)
  } catch (err: any) {
    return next(err)
  }

  if (result.matchedCount) {
    const updated = await Book.findById(id)
    return res.send(updated);
  }
  res.status(404).send({message:'Not Found'})
})


/**
 * @route DELETE /books/:id
 */
router.delete('/books/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  let result
  try {
    result = await Book.deleteOne({ _id: id })
  } catch (err: any) {
    return next(err)
  }
  
  if(result.deletedCount) {
    return res.status(200).send({message: 'Record Deleted'})
  }
  res.status(404).send({message:'Not Found'})
})

export { router as booksRouter }