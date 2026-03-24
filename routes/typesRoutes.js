import express from 'express'
const  router = express.Router()

import { addType } from '../controllers/typesControllers.js'
import { authMidlleware } from '../middlewares/authMiddleware.js'

// Routes
router.post('/', authMidlleware, addType)

export default router