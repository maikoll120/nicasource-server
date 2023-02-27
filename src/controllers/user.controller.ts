import { type Request, type Response, type NextFunction } from 'express'
import { type Request as JWTRequest } from 'express-jwt'
import { User, Follower } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SALT_ROUNDS, SECRET, TOKEN_EXPIRE } from '../lib/config'
import { sequelize } from '../database'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const findUser = await User.findOne({
      where: {
        email
      }
    })

    if (!findUser) { throw new Error('Invalid email or password') }

    const user = findUser.dataValues

    const match = await bcrypt.compare(password, user.password)

    if (!match) { throw new Error('Invalid email or password') }

    const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: TOKEN_EXPIRE })

    res.json({ name: user.name, email, token })
  } catch (error) {
    next(error)
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body

    const userList = await User.findAll({
      where: {
        email
      }
    })

    if (userList.length) { throw new Error('Email already in use') }

    const encryptedPassword = await bcrypt.hash(password, +SALT_ROUNDS)

    const createdUser = await User.create({
      name,
      email,
      password: encryptedPassword
    })

    const token = jwt.sign({ sub: createdUser.dataValues.id }, SECRET, { expiresIn: TOKEN_EXPIRE })

    res.json({ name, email, token })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.auth?.sub ?? ''
    const isFollowed = !!req.query.followed

    const querySelect = 'SELECT u.* '
    let queryFrom = 'FROM users u '
    let queryWhere = 'WHERE 1=1 '

    if (isFollowed) {
      queryFrom += ',followers f '
      queryWhere += `AND f."userIdOrigin" = '${currentUserId}' `
      queryWhere += 'AND u.id = f."userIdTarget" '
    }

    const queryOrderBy = 'ORDER BY u.name DESC'

    const [results] = await sequelize.query(querySelect + queryFrom + queryWhere + queryOrderBy)

    console.log(isFollowed)
    res.send(results.map((user: any) => {
      const { id, name } = user

      return {
        id,
        name
      }
    }))
  } catch (error) {
    next(error)
  }

  /* try {
    const userList = await User.findAll()

    res.send(userList.map(user => {
      const { id, name } = user.dataValues
      return {
        id,
        name
      }
    }))
  } catch (error) {
    next(error)
  } */
}

export const getProfile = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id
    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    if (!user) { return res.send({}) }

    const { id, name, email } = user.dataValues

    res.send({ id, name, email })
  } catch (error) {
    next(error)
  }
}

export const follow = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userIdOrigin = req.auth?.sub
    const userIdTarget = req.params.id

    await Follower.findOrCreate({
      where: {
        userIdOrigin,
        userIdTarget
      }
    })

    res.send({ follow: true })
  } catch (error) {
    next(error)
  }
}

export const unfollow = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userIdOrigin = req.auth?.sub
    const userIdTarget = req.params.id

    await Follower.destroy({
      where: {
        userIdOrigin,
        userIdTarget
      }
    })

    res.send({ follow: false })
  } catch (error) {
    next(error)
  }
}

export const getFollowers = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const userIdOrigin = req.auth?.sub
    const userIdTarget = req.params.id

    const countFollowers = await Follower.count({
      where: {
        userIdTarget
      }
    })

    const isFollowed = await Follower.count({
      where: {
        userIdOrigin,
        userIdTarget
      }
    })

    res.send({ countFollowers, isFollowed: !!isFollowed })
  } catch (error) {
    next(error)
  }
}

export const getCurrent = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.auth?.sub
    const user = await User.findByPk(currentUserId)
    const { id, name, email } = user?.dataValues

    res.send({ id, name, email })
  } catch (error) {
    next(error)
  }
}

export const updateCurrent = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const currentUserId = req.auth?.sub
    const { name } = req.body

    await User.update({ name }, {
      where: {
        id: currentUserId
      }
    })

    res.send({ updated: true })
  } catch (error) {
    next(error)
  }
}
