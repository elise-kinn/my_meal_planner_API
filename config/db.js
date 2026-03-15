import pgPromise from 'pg-promise'
const pgp = pgPromise()

const dbURI = process.env.DB_URI

const db = pgp(dbURI)

db.one('SELECT $1 AS value', 123)
.then(data => console.log(data))
.catch(err => console.error(`Erreur : ${err} `))

export default db