import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

export default function validateId(req: Request, res: Response, next: NextFunction) {
  if(!Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send('Not Found')
  } else {
    next()
  }
}