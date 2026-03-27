import express from 'express'
const  router = express.Router()

import { addType, getAllTypes } from '../controllers/typesControllers.js'
import { authMidlleware } from '../middlewares/authMiddleware.js'

// Routes
router.post('/', authMidlleware, addType)
router.get('/:id', authMidlleware, getAllTypes)

export default router