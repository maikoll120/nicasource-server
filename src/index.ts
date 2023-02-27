import express, { type Express } from 'express'
import logger from 'morgan'
import cors from 'cors'
import { PORT } from './lib/config'
import { initConnection } from './database'
import './models'
import routes from './routes'
import { errorHandler } from './middlewares'

async function App () {
  // Database
  await initConnection()

  // Express app
  const app: Express = express()

  // Middlewares
  app.use(logger('dev'))
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Routes
  routes(app)

  // Error handler
  app.use(errorHandler)

  // Listener
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`)
  })
}

App().catch(console.log)
