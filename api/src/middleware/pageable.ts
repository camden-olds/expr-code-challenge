import { Request, Response, NextFunction } from 'express'

const perPageMax:number = 100
const perPageDefault:number = 20

export default function pageable(req: Request, res: Response, next: NextFunction) {
  let perPage:number = perPageDefault
  let offset:number = 0
  let page:number = 1
  if(req.query?.perPage) {
    
    const ppParam:number = parseInt(req.query.perPage as string)
    perPage = ppParam > perPageMax ? perPageMax : ppParam
    if(ppParam < 1) perPage = 1
  }
  if(req.query?.page) {
    let pParam:number = parseInt(req.query.page as string)
    if(pParam < 1) pParam = 1
    offset = (pParam - 1) * perPage
    page = pParam
  }

  req.body.pagination = {perPage, offset, page}
  next()
}