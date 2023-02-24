import { Sequelize } from 'sequelize'
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } from '../lib/config'

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

export const initConnection = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('🟢 Database successfully connected')
  } catch (error) {
    console.error('🔴 Unable to connect to the database')
  }
}
