import express from 'express'
const router = express.Router()

import { addMeal, getMeals } from '../controllers/mealsControllers.js'
import { authMidlleware } from '../middlewares/authMiddleware.js'

// Routes
router.post('/', authMidlleware, addMeal)
router.get('/', authMidlleware, getMeals)

export default router