import express from 'express'
import { userController } from '../controllers'

export const router = express.Router()

// GET
router.get('/', userController.getAll)

// POST
router.post('/', userController.create)
