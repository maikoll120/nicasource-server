import { DataTypes } from 'sequelize'
import { sequelize } from '../database'
import { User, Video } from '../models'

export const Like = sequelize.define('likes', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  videoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Video,
      key: 'id'
    }
  }
})

User.belongsToMany(Video, { through: Like })
Video.belongsToMany(User, { through: Like })
