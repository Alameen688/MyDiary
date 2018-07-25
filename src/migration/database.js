import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const client = new Client();
client.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

const userTableQuery = 'CREATE TABLE users(id SERIAL PRIMARY KEY, fullname VARCHAR(255) not null, email VARCHAR(225) UNIQUE not null, password TEXT not null, created_at DATE not null, updated_at DATE not null)';
const entriesTableQuery = 'CREATE TABLE entries(id SERIAL PRIMARY KEY, user_id INTEGER not null, title TEXT not null, content TEXT not null, created_at DATE not null, updated_at DATE not null)';

const tableQuery = `${userTableQuery} ; ${entriesTableQuery}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Migrations successful');
});
