import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER || "ingrid",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "donna", 
  password: process.env.DB_PASSWORD || "123",
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const testConnection = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        console.log("Connecté au PostgreSQL")
        client.release();
    }   catch (error) {
        console.error("Erreur de connexion à la base de données", error);
        process.exit(1);
    }
};

export default pool;
