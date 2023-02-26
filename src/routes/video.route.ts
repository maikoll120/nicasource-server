import express from 'express'
import { videoController } from '../controllers'
import { authorizeUser, authorizeOwnerUser } from '../middlewares/authHandler'

export const router = express.Router()

// GET
router.get('/', authorizeUser(), videoController.getAll)
router.get('/:id/summary', authorizeUser(), videoController.getSummary)
router.get('/:id', authorizeOwnerUser(), videoController.getVideo)
router.get('/:id/published', authorizeOwnerUser(), videoController.getPublished)
router.get('/:id/likes', authorizeUser(), videoController.getLikes)

// POST
router.post('/', authorizeUser(), videoController.create)

// PUT
router.put('/:id', authorizeOwnerUser(), videoController.updateVideo)
router.put('/:id/published', authorizeOwnerUser(), videoController.updatePublished)
router.put('/:id/like', authorizeUser(), videoController.like)
router.put('/:id/dislike', authorizeUser(), videoController.dislike)

// DELETE
