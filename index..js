import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import './config/db.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to my API ReSTful')
})

// Routes
import usersRoutes from './routes/usersRoutes.js'
app.use('/api/v1/users', usersRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré : http://localhost:${process.env.PORT}`)
}) 