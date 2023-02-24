import express, { type Express, type Request, type Response } from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { sequelize } from './database/database'

dotenv.config()

async function App () {
  // Database
  try {
    await sequelize().authenticate()
    console.log('🟢 Database successfully connected')
  } catch (error) {
    console.error('🔴 Unable to connect to the database')
  }

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

  // Port
  const port = process.env.PORT ?? 3000

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`)
  })
}

App().catch(console.log)
