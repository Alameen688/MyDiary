/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

class ClientController {
  constructor() {
    this._connectionString = process.env.DATABASE_URL;
    this._client = new Client({
      connectionString: this._connectionString,
    });
    this._client.connect();
  }
}

module.exports = ClientController;
