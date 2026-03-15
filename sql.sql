CREATE DATABASE my_meal_planner

CREATE TABLE users (
    id_user serial PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    password_hash varchar(100) NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp
)

CREATE TABLE meals (
    id_meal serial PRIMARY KEY,
    name_meal varchar(100) NOT NULL UNIQUE,
    fk_id_type integer REFERENCES types(id_type) ON DELETE restrict ON UPDATE restrict
)

CREATE TABLE types (
    id_type serial PRIMARY KEY,
    name_type varchar(50) NOT NULL UNIQUE
)

CREATE TABLE ingredients (
    id_ingredient serial PRIMARY KEY,
    name_ingredient varchar(50) NOT NULL UNIQUE
)

CREATE TABLE meals_ingredients (
    id_meal_ingredient serial PRIMARY KEY,
    fk_id_meal integer REFERENCES meals(id_meal) ON DELETE cascade ON UPDATE cascade,
    fk_id_ingredient integer REFERENCES ingredients(id_ingredient) ON DELETE cascade ON UPDATE cascade
)

CREATE TABLE services (
    id_services serial PRIMARY KEY,
    date_service date NOT NULL, 
    type_service ENUM('breakfast', 'diner') NOT NULL
)

CREATE TABLE service_meal_user (
    id_service_meal_user serial PRIMARY KEY,
    fk_id_meal integer REFERENCES meals(id_meal) ON DELETE cascade ON UPDATE cascade,
    fk_id_service integer REFERENCES services(id_service) ON DELETE cascade ON UPDATE cascade,
    fk_id_user integer REFERENCES users(id_user) ON DELETE cascade ON UPDATE cascade
)
