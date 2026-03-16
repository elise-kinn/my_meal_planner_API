import express from 'express'
const  router = express.Router()

import register from '../controllers/usersControllers.js'

// Routes
router.post('/register', register)

export default router