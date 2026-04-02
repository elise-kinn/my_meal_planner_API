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

        const newMealId = await db.one(`
            INSERT INTO meals_users(fk_id_meal, fk_id_user, date, type_meal) 
            VALUES ($1, $2, $3, $4)
            RETURNING id_meal_user
        `, [ id_meal, id_user, formatedDate, mealType ])
        
        const newMeal = await db.one(`
            SELECT m.name_meal, TO_CHAR(mu.date, 'YYYY-MM-DD') AS date, mu.type_meal
            FROM meals_users AS mu
            JOIN meals AS m ON m.id_meal = mu.fk_id_meal
            WHERE id_meal_user = $1
        `, [ newMealId.id_meal_user ])

        return res.status(201).json(newMeal)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getMealsofTheService = async(req, res) => {
    const id_user = req.user.id_user
    const start = req.query.start ? req.query.start : '2000-01-10'
    const end = req.query.end ? req.query.end : '2999-01-01'

    try {

        // Ajouter JOIN avec table types pour l'icône
        
        const meals = await db.manyOrNone(`
            SELECT m.name_meal, TO_CHAR(mu.date, 'YYYY-MM-DD') AS date, mu.type_meal
            FROM meals AS m
            JOIN meals_users AS mu ON mu.fk_id_meal = m.id_meal
            WHERE m.fk_id_user = $1 AND mu.date >= $2 AND mu.date <= $3
        `, [ id_user, start, end ])

        return res.status(200).json(meals)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { addService, getMealsofTheService }