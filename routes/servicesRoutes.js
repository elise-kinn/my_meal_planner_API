import express from 'express'
const router = express().router

import { authMidlleware } from '../middlewares/authMiddleware.js'
import { addService, getMealsofTheService } from '../controllers/servicesControllers.js'

router.post('/', authMidlleware, addService)
router.get('/',  authMidlleware, getMealsofTheService)

export default router