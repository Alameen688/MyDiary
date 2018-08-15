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
// const alterQuery = `ALTER TABLE users ADD COLUMN notification status NOT NULL DEFAULT 'on';
// ALTER TABLE users ADD COLUMN notification_time TIME NULL`;
const tableTypeQuery = 'CREATE TYPE status AS ENUM (\'on\', \'off\');';
const userTableQuery = `DROP TABLE IF EXISTS users cascade;
CREATE TABLE users(id SERIAL PRIMARY KEY, fullname VARCHAR(255) NOT NULL, email VARCHAR(225) UNIQUE NOT NULL, password TEXT NOT NULL, fav_quote TEXT NULL, notification status NOT NULL DEFAULT 'off', notification_time TIME NOT NULL DEFAULT '18:00:00',
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
const entriesTableQuery = `DROP TABLE IF EXISTS entries;
  CREATE TABLE entries(id SERIAL PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), FOREIGN KEY (user_id) REFERENCES users(id))`;
const createTestUser = `INSERT INTO users(fullname, email, password, created_at, updated_at)
VALUES('Testing tester', 'tester@mydiary.com', '$2b$10$oJAej2j9gnf.0RE4ATsl6OONArYqxl9BtM/.scp6kUVZIRJV40WS6', NOW(), NOW())`;
const tableQuery = `${tableTypeQuery}; ${userTableQuery} ; ${entriesTableQuery} ; ${createTestUser}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Database setup successful');
});
