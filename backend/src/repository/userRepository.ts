import {User} from "../types/UserModel";
import { Pool } from 'pg';
import pool from "../libs/database";

export const findUserByEmal = async (email:string) : Promise <User | null> => {
const result = await pool.query("SELECT * FROM users WHERE email =$1", [email] );
return result.rows[0] || null;
};

export const createUser =async (user: Omit <User, "id" | "created_at">): Promise <User> => {
    const {first_name, last_name, email, password } = user;
    const result = await pool.query(`INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [first_name, last_name, email, password]
);
return result.rows[0];
}

export const findUserById = async (id:number) : Promise <User | null> =>{
    const result = await pool.query ("SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1", [id] );
    return result.rows[0] || null;
};