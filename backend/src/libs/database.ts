import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
  user: process.env.PGUSER, // @ingrid i changed this to .env to hide the credentials
  password: process.env.PGPASSWORD, // @ingrid i changed this to .env to hide the credentials
  host: process.env.PGHOST,  // @ingrid i changed this to .env to hide the credentials
  port: process.env.PGPORT? parseInt(process.env.PGPORT, 10): undefined, // @ingrid i changes this to .env to hide the credentials
  database: process.env.PGDATABASE,  // @ingrid i changed this to .env to hide the credentials
  // @INGIRD - i also changed the sequence to match that of the .env file, to be consistent
  
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