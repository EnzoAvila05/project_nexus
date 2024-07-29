CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    cellphone TEXT NOT NULL
);