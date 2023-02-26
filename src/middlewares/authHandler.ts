import { type Response, type NextFunction } from 'express'
import { expressjwt, type Request as JWTRequest } from 'express-jwt'
import { SECRET } from '../lib/config'
import { Video } from '../models'

export const authorizeUser = () => {
  return expressjwt({
    secret: SECRET,
    algorithms: ['HS256']
  })
}

export const authorizeOwnerUser = () => {
  return [
    authorizeUser(),
    async (req: JWTRequest, res: Response, next: NextFunction) => {
      const currentUserId = req.auth?.sub
      const videoId = req.params.id

      const isValid = await Video.findOne({
        where: {
          id: videoId,
          userId: currentUserId
        }
      })

      if (!isValid) { return res.status(401).json({ message: 'Unauthorized' }) }

      next()
    }
  ]
}
