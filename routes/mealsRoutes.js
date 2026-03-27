import express from 'express'
const router = express.Router()

import { addMeal, getMealsByInput, getAllMeals } from '../controllers/mealsControllers.js'
import { authMidlleware } from '../middlewares/authMiddleware.js'

// Routes
router.post('/', authMidlleware, addMeal)
router.get('/:input', authMidlleware, getMealsByInput)
router.get('/', authMidlleware, getAllMeals)

export default router