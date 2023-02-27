
import { type Response, type NextFunction } from 'express'
import { type Request as JWTRequest } from 'express-jwt'
import { Video, Like, User } from '../models'
import { sequelize } from '../database'

export const getAll = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.auth?.sub ?? ''
    const isOwned = !!req.query.owned
    const isLiked = !!req.query.liked
    const specificUser = req.query.userid ? String(req.query.userid) : ''

    const querySelect = 'SELECT v.* '
    let queryFrom = 'FROM videos v '
    let queryWhere = 'WHERE 1=1 '

    if (specificUser) {
      queryWhere += `AND v."userId" = '${specificUser}' `
    } else {
      if (!isOwned) { queryWhere += 'AND v.published = true ' }
      if (isOwned) { queryWhere += `AND v."userId" = '${currentUserId}' ` }
      if (isLiked) {
        queryFrom += ',likes l '
        queryWhere += 'AND v.id = l."videoId" '
      }
    }

    const queryOrderBy = 'ORDER BY v."createdAt" DESC'

    const [results] = await sequelize.query(querySelect + queryFrom + queryWhere + queryOrderBy)

    res.send(results.map((video: any) => {
      const { id, title, createdAt, userId } = video

      return {
        id,
        title,
        createdAt,
        isOwned: currentUserId === userId
      }
    }))
  } catch (error) {
    next(error)
  }
}

export const getSummary = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.sub
    const videoId = req.params.id

    const video = await Video.findOne({
      attributes: ['id', 'title', 'description', 'url', 'published', 'createdAt'],
      where: {
        id: videoId
      },
      include: {
        model: User,
        attributes: ['id', 'name']
      }
    })

    if (!video || (video.dataValues.published === false && video.dataValues.user.id !== userId)) { return res.send({}) }

    res.send(video)
  } catch (error) {
    next(error)
  }
}

export const create = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.sub
    const { title, description, url } = req.body

    await Video.create({
      title,
      description,
      url,
      userId
    })

    res.json({ created: true })
  } catch (error) {
    next(error)
  }
}

export const getVideo = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id
    const video = await Video.findByPk(videoId)

    res.send(video?.dataValues)
  } catch (error) {
    next(error)
  }
}

export const updateVideo = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id
    const { title, description, url } = req.body

    await Video.update({ title, description, url }, {
      where: {
        id: videoId
      }
    })

    res.send({ updated: true })
  } catch (error) {
    next(error)
  }
}

export const getPublished = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id
    const video = await Video.findByPk(videoId)

    res.send({ published: video?.dataValues.published })
  } catch (error) {
    next(error)
  }
}

export const updatePublished = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id
    const { published } = req.body

    await Video.update({ published }, {
      where: {
        id: videoId
      }
    })

    res.send({ published })
  } catch (error) {
    next(error)
  }
}

export const like = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.sub
    const videoId = req.params.id

    await Like.findOrCreate({
      where: {
        userId,
        videoId
      }
    })

    res.send({ like: true })
  } catch (error) {
    next(error)
  }
}

export const dislike = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.sub
    const videoId = req.params.id

    await Like.destroy({
      where: {
        userId,
        videoId
      }
    })

    res.send({ like: false })
  } catch (error) {
    next(error)
  }
}

export const getLikes = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.sub
    const videoId = req.params.id

    const countLikes = await Like.count({
      where: {
        videoId
      }
    })

    const isLiked = await Like.count({
      where: {
        userId,
        videoId
      }
    })

    res.send({ countLikes, isLiked: !!isLiked })
  } catch (error) {
    next(error)
  }
}
