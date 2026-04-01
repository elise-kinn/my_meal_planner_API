import db from '../config/db.js'

const addMeal = async (req, res) => {
    const { ingredientsForms, mealTitle, selectedType } = req.body
    const id_user = req.user.id_user
    
    const typeId = parseInt(selectedType)
    const alertInput = []


    try {
        if(!mealTitle) alertInput.push('title')
        if(selectedType == 0) alertInput.push('select')
        if(alertInput.length > 0) return res.status(400).json({ message: "Ce champ est obligatoire", alertInput })

        const isExistingMealTitle = await db.oneOrNone(`
            SELECT id_meal 
            FROM meals
            WHERE name_meal = $1 AND fk_id_user = $2
        `, [ mealTitle, id_user ])

        if(isExistingMealTitle) return res.status(400).json({ message: "Ce plat existe déjà", alertInput: ['title']})

        const meal = await db.one(`
            INSERT INTO meals(name_meal, fk_id_user, fk_id_type)
            VALUES($1, $2, $3)
            RETURNING id_meal
        `, [ mealTitle, id_user, typeId ])

        for (const ingredient of ingredientsForms){

            const trimmed = ingredient.trim()
            if(trimmed === '') continue
            
            const ingredientsResult = await db.one(`
                INSERT INTO ingredients(name_ingredient, fk_id_user)
                VALUES($1, $2)
                ON CONFLICT(name_ingredient)
                DO UPDATE SET name_ingredient = EXCLUDED.name_ingredient
                RETURNING id_ingredient
            `, [trimmed, id_user])

            await db.none(`
                INSERT INTO meals_ingredients(fk_id_meal, fk_id_ingredient)
                VALUES($1, $2)
            `, [ meal.id_meal, ingredientsResult.id_ingredient ])

        }
        
        res.status(200).json({ message: 'OK' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getMeals = async (req, res) => {
    // const input = req.params.input
    const id_user = req.user.id_user
    const { search, order } = req.query

    const searchFilter = search ? search : '%'
    const validSortColumns = ['name_meal', 'created_at', 'name_type'];
    const orderBy = validSortColumns.includes(order) ? order : 'name_meal'

    try {
        const meals = await db.manyOrNone(`
            SELECT id_meal, name_meal, name_type
            FROM meals AS m
            LEFT JOIN types AS t ON t.id_type = m.fk_id_type
            WHERE LOWER(name_meal) LIKE LOWER($1 || '%')
            AND m.fk_id_user = $2
            ORDER BY ${orderBy} ASC
        `, [ searchFilter, id_user ])

        return res.status(200).json(meals)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { addMeal, getMeals }