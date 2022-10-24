import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { json } from 'body-parser'
import routeErrorHandling from './middleware/routeErrorHandling'
import * as dotenv from 'dotenv'
dotenv.config()

/** Cors Config */
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/** Routes Imports */
import { booksRouter } from './routes/books'

const routePrefix = '/v1'
const app = express()

app.use(cors(corsOptions))
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

