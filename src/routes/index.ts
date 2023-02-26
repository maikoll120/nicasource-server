import { type Express } from 'express'
import { router as userRoute } from './user.route'
import { router as videoRoute } from './video.route'

export default function (app: Express) {
  app.use('/users', userRoute)
  app.use('/videos', videoRoute)
}
