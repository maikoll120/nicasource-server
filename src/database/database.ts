import { Sequelize } from 'sequelize'

export const sequelize = () => {
  return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  })
}
