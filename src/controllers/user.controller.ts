import { type Request, type Response, type NextFunction } from 'express'
import { User } from '../models'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userList = await User.findAll()
    res.send(userList)
  } catch (error) {
    next(error)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body

    await User.create({
      name,
      email,
      password
    })

    res.send('User created')
  } catch (error) {
    next(error)
  }
}
