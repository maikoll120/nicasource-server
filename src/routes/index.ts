import { type Express } from 'express'
import { router as userRoute } from './user.route'

export default function (app: Express) {
  app.use('/users', userRoute)
}
