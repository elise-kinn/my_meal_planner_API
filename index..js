import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import './config/db.js'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to my API ReSTful')
})

app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré : http://localhost:${process.env.PORT}`)
}) 