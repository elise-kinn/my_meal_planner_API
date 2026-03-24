import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    const {username, password, confPassword, RGPD} = req.body
    const alertInput = []

    try {
        if(!username) alertInput.push('username')
        if(!password) alertInput.push('password')
        if(!confPassword) alertInput.push('confPassword')
        if(!RGPD) alertInput.push('RGPD')

        if(alertInput.length > 0) return res.status(400).json({ message: "Ce champ est obligatoire", alertInput })

        const usernames = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
        if(usernames) return res.status(400).json({ message : "Ce nom d'utilisateur existe déjà", alertInput: ["username"]})
            
        if(password !== confPassword) return res.status(400).json({ message: "La confirmation de mot de passe est invalide" , alertInput:["confPassword"]})
        
        const salt = await bcrypt.genSalt(12)
        const password_hash = await bcrypt.hash(password, salt)

        const newUser = await db.one('INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING username, id_user', [username, password_hash])
        
        const token = jwt.sign(
            {
                id_user: newUser.id_user, 
                username: newUser.username
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        )

        res.status(201).json({ 
            user: {
                id_user: newUser.id_user, 
                username: newUser.username
            }, 
            token 
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const alertInput = []

    try {
        if(!username) alertInput.push('username')
        if(!password) alertInput.push('password')
        if(alertInput.length > 0) return res.status(400).json({ message: "Tous les champs sont obligatoires", alertInput })

        const user = await db.oneOrNone('SELECT username, password_hash, id_user FROM users WHERE username = $1', username)
        if(!user) return res.status(400).json({ message: "Ces informations sont incorrectes", alertInput: ['username', 'password']})

        const isMatchedPassword = await bcrypt.compare(password, user.password_hash)
        if(!isMatchedPassword) return res.status(400).json({ message: "Ces informations sont incorrectes", alertInput: ['username', 'password'] })

        const token = jwt.sign(
            {
                id_user: user.id_user, 
                username: user.username
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        )

        res.status(200).json({ 
            user:{
                id_user: user.id_user, 
                username: user.username
            }, 
            token 
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { login, register };
