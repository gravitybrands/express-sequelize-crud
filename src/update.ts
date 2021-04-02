import { RequestHandler, Request } from 'express'
import { GetOne } from './getOne'

export type Update<R> = (id: string, data: R, req: Request) => Promise<any>

export const update = <R>(
  doUpdate: Update<R>,
  doGetOne: GetOne<R>
): RequestHandler => async (req, res, next) => {
  try {
    const record = await doGetOne(req.params.id, req)

    if (!record) {
      return res.status(404).json({ error: 'Record not found' })
    }

    res.json(await doUpdate(req.params.id, req.body, req))
  } catch (error) {
    next(error)
  }
}
