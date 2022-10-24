import { Request, Response, NextFunction } from 'express'

export default function routeErrorHandling(err: any, req: Request, res: Response, next: NextFunction) {
  if(!err) return next()

  if (err.name === "ValidationError") {
    const errors: {[key: string]: string} = {}
    Object.keys(err.errors).forEach(k => {
      errors[k] = err.errors[k].message
    })

    return res.status(400).send(errors)
  }
  console.log(err)
  res.status(500).send("Something went wrong")

}