import express, { type Express, type Request, type Response } from 'express'
import logger from 'morgan'
import { PORT } from './lib/config'
import { initConnection } from './database'
import './models'

async function App () {
  // Database
  await initConnection()

  // Express app
  const app: Express = express()

  // Middlewares
  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Routes
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
  })

  // Listener
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`)
  })
}

App().catch(console.log)
