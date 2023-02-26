import express from 'express'
import { userController } from '../controllers'
import { authorizeUser } from '../middlewares/authHandler'

export const router = express.Router()

// GET
router.get('/', authorizeUser(), userController.getAll)
router.get('/:id/profile', authorizeUser(), userController.getProfile)
router.get('/:id/followers', authorizeUser(), userController.getFollowers)
router.get('/current', authorizeUser(), userController.getCurrent)

// POST
router.post('/authenticate', userController.authenticate)
router.post('/register', userController.register)

// PUT
router.put('/:id/follow', authorizeUser(), userController.follow)
router.put('/:id/unfollow', authorizeUser(), userController.unfollow)
router.put('/current', authorizeUser(), userController.updateCurrent)

// DELETE
