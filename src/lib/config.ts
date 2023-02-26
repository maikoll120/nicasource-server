
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

// Encryption config
export const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 10
export const SECRET = process.env.SECRET ?? 'gJ4IQg8KmW1cjIBZEluROSWua3HEU8hS'
export const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE ?? 3600000
