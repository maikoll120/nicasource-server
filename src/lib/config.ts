
import dotenv from 'dotenv'
dotenv.config()

// Express config
export const PORT = process.env.PORT ?? 3000

// Database config
export const DB_HOST = process.env.DB_HOST ?? '127.0.0.1'
export const DB_USER = process.env.DB_USER ?? 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'admin'
export const DB_NAME = process.env.DB_NAME ?? 'develop'
export const DB_PORT = process.env.DB_PORT ?? 5432
