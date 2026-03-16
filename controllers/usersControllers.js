import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    console.log(req.body)
    const {username, password, confPassword, RGPD} = req.body
    const emptyInput = []

    try {
        if(!username) emptyInput.push('username')
        if(!password) emptyInput.push('password')
        if(!confPassword) emptyInput.push('confPassword')
        if(!RGPD) emptyInput.push('RGPD')

        if(emptyInput.length > 0) return res.status(400).json({ message: "Ce champ est obligatoire", emptyInput })

        const usernames = db.one('SELECT * FROM users WHERE username = $1', [username])
        if(usernames) return res.status(400).json({ message : "Ce nom d'utilisateur existe déjà", input: "username"})
            
        if(password !== confPassword) return res.status(400).json({ message: "La confirmation de mot de passe est invalide" , input: "confPassword"})
        
        const salt = await bcrypt.genSalt(12)
        const password_hash = await bcrypt.hash(password, salt)

        const newUser = db.one('INSER INTO users (username, password_hash) VALUES ($1, $2)', [username, password_hash])
        
        const token = jwt.sign(
            {
                id_user: newUser.id_user, 
                username: newUser.username
            }, 
            process.env.SECRET, 
            { expiresIn: "1h" }
        )

        res.status(201).json({ newUser, token })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export default register