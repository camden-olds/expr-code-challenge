import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'
import routeErrorHandling from './middleware/routeErrorHandling'
import * as dotenv from 'dotenv'
dotenv.config()

/** Routes Imports */
import { booksRouter } from './routes/books'

const routePrefix = '/v1'
const app = express()

app.use(json())
app.use(routePrefix,booksRouter)
app.use(routeErrorHandling)

/** DB Connection */
mongoose.connect(process.env.MONGOURL!, {}, (err) => {
  if(err) throw err
  else console.log('Connected to database')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
})

