import db from '../config/db.js'

const addMeal = async (req, res) => {
    const { ingredientsForms, mealTitle, selectedType } = req.body
    const typeId = parseInt(selectedType)
    const alertInput = []

    try {
        if(!mealTitle) alertInput.push('title')
        if(selectedType == 0) alertInput.push('select')
        if(alertInput.length > 0) return res.status(400).json({ message: "Ce champ est obligatoire", alertInput })

        const isExistingMealTitle = db.oneOrNone(`
            SELECT id_meal 
            FROM meals
            WHERE name_meal = $1
        `, [ mealTitle ])

        if(isExistingMealTitle) return res.status(400).json({ message: "Ce plat existe déjà", alertInput: ['title']})

        const mealId = await db.one(`
            INSERT INTO meals(name_meal, fk_id_user, fk_id_type)
            VALUES($1, $2, $3)
            RETURNING id_meal
        `, [ mealTitle, req.user.id_user, typeId ])

        for (const ingredient of ingredientsForms)  {
            const trimmed = ingredient.trim()
            if(trimmed === '') continue
            
            const ingredientsResult = await db.one(`
                INSERT INTO ingredients(name_ingredient, fk_id_user)
                VALUES($1, $2)
                ON CONFLICT(name_ingredient)
                DO UPDATE SET name_ingredient = EXCLUDED.name_ingredient
                RETURNING id_ingredient
            `, [trimmed, req.user.id_user])
            
            await db.none(`
                INSERT INTO meals_ingredients(fk_id_meal, fk_id_ingredient)
                VALUES($1, $2)
            `, [ mealId, ingredientsResult.id_ingredient ])
        }
        
        res.status(200).json({ message: 'OK' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { addMeal }