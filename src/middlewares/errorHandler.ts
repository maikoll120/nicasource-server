import { type Request, type Response, type NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Server Error
  let statusCode = 500

  // Client Error
  if (err.name) {
    switch (err.name) {
      case 'UnauthorizedError':
        statusCode = 401
        break
      case 'ForbiddenError':
        statusCode = 403
        break
      case 'NotFoundError':
        statusCode = 404
        break
      default: // BadRequestError
        statusCode = 400
        break
    }
  }

  // Response
  return res.status(statusCode).json({ message: err.message })
}
