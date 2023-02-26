import { DataTypes } from 'sequelize'
import { sequelize } from '../database'
import { User } from '../models'

export const Follower = sequelize.define('followers', {
  userIdOrigin: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  userIdTarget: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

User.belongsToMany(User, { as: 'follower', through: Follower, foreignKey: 'userIdOrigin' })
User.belongsToMany(User, { as: 'followered', through: Follower, foreignKey: 'userIdTarget' })
