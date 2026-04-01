import db from "../config/db.js";

const addService = async (req, res) => {
    const { idMeal, formatedDate, mealType } = req.body
    const id_meal = parseInt(idMeal)
    const id_user = req.user.id_user

    try {
        if(!idMeal ||!formatedDate) return res.status(400).json({ message: "Informations manquantes" })

        const isAlreadyInserted = await db.oneOrNone(`
            SELECT fk_id_meal
            FROM meals_users
            WHERE fk_id_meal = $1 AND fk_id_user = $2 AND date = $3 AND type_meal = $4
        `, [ id_meal, id_user, formatedDate, mealType ])

        if(isAlreadyInserted) return res.status(400).json(isAlreadyInserted.fk_id_meal)

        await db.none(`
            INSERT INTO meals_users(fk_id_meal, fk_id_user, date, type_meal) 
            VALUES ($1, $2, $3, $4)
        `, [ id_meal, id_user, formatedDate, mealType ])

        return res.status(201).json({ message: "OK"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { addService }