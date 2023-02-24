import { DataTypes } from 'sequelize'
import { sequelize } from '../database'
import { Video } from './Video'

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.hasMany(Video, {
  foreignKey: 'userId',
  sourceKey: 'id'
})

Video.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
})
