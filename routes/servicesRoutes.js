import express from 'express'
const router = express().router

import { authMidlleware } from '../middlewares/authMiddleware.js'
import { addService } from '../controllers/servicesControllers.js'

router.post('/', authMidlleware, addService)

export default router