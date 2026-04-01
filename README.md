[![Statut du Projet](https://img.shields.io/badge/Statut-En%20Cours-yellow?style=flat-square)]([LIEN_VERS_VOTRE_REPO])
[![Type](https://img.shields.io/badge/Type-API%20RESTful-blue?style=flat-square)]([LIEN_VERS_VOTRE_REPO])
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)]([LIEN_VERS_VOTRE_REPO])
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)]([LIEN_VERS_VOTRE_REPO])
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)]([LIEN_VERS_VOTRE_REPO])
[![Neon](https://img.shields.io/badge/DB%20Host-Neon-00E599?style=flat-square&logo=neon&logoColor=black)]([LIEN_VERS_VOTRE_REPO])


# My Meal Planner Back-end

## Objectifs
- Gestion d'un planning des repas (déjeuner et dîner) sur la semaine
- Génération d'une liste de course en fonction du planning
- CRUD de plats à insérer dans le planning

## Public Cible
- Personnes en recherche d'une aide pour la gestion d'un planning des repas de la semaine 
- Personnes organisées voulant une plateforme pour enregistrer des recettes

## Fonctionnalités
- Inscription / Connexion / Déconnexion
- Planning hebdomadaire : Gestion des repas à partir d'une liste créer par l'utilisateur
- Génération d'une liste de course en fonction du planning (possibles ajout d'éléments sur toutes les semaines)
- CRUD de plats à insérer dans le planning (nom, type, ingrédients)
- Possibilité de créer de nouveaux types de plats

## Installation et lancememt
### Prérequis
- **Node.js**
- **BDD PostgreSQL**
- **Variables d'environnement**

### Dépendances
```
npm install
```

- **Bcrypt** : Hâchage de mots de passe
- **CORS** : Partage des ressources entre origines multiples
- **Dotenv** : Variables d'environnement
- **Express** : Router
- **JsonWebToken** : Génération des token d'authentification
- **Nodemon** : Relance du serveur à chaque sauvegarde
- **PG-Promise** : Interface PostgreSQL

### Configuration des variables d'environnement 
Créez un fichier `.env` à la racine du projet
```bash
PORT=3000
DB_URI=<VOTRE_LIEN_DE_CONNEXION_URI_NEON>
JWT_SECRET=<VOTRE_CLE_SECRETE>
```

### Lancement de l'API
```bash
node .\index.js
```

L'API sera disponible sur `http://localhost:3000`

## Architecture du dossier `back/`

## Endpoints et Routes API `/api/v1`