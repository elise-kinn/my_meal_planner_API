import db from '../config/db.js'

const addType = async (req, res) => {
    const inputType = req.body.type.trim()
    if(inputType === '') return res.status(400).json({ message: "Champ vide"})
    if(inputType.length >= 25) return res.status(400).json({ message: "Ce nom est trop long !"})
    const lowercaseType = inputType.toLowerCase()
    const capitalizedType = lowercaseType.charAt(0).toUpperCase() + lowercaseType.slice(1)

    try {
        
        const isAleardyType = await db.oneOrNone('SELECT name_type FROM types WHERE name_type = $1', [capitalizedType])
        if(isAleardyType) return res.status(400).json({ message: "Ce type existe déjà"})
        
        await db.none('INSERT INTO types(name_type, fk_id_user) VALUES($1, $2)', [ capitalizedType, req.user.id_user ])

        return res.status(201).json({ message: "Nouveau type créé !" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export { addType }