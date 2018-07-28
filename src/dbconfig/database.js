import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

const userTableQuery = 'CREATE TABLE users(id SERIAL PRIMARY KEY, fullname VARCHAR(255) NOT NULL, email VARCHAR(225) UNIQUE NOT NULL, password TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())';
const entriesTableQuery = 'CREATE TABLE entries(id SERIAL PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())';

const tableQuery = `${userTableQuery} ; ${entriesTableQuery}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Migrations successful');
});
