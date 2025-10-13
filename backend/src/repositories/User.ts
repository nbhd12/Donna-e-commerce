import pool from '../Database';
import { User } from '../models/User';

export class UserModel {
  
  // create new user
  static async create(user: User): Promise<User> {
    const { first_name, last_name, email, password } = user;

    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, password]
    );

    return result.rows[0]; 
  }

  // find by email
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0] || null;
  }

  // find by id
  static async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0] || null;
  }

  // verify password
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    if (hashedPassword === '1234') {
      return plainPassword === '1234';
    }

    return plainPassword === hashedPassword; 
  }
}
