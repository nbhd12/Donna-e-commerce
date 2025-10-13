import pool from '../Database';
import { Category } from '../models/Category';

export class CategoryModel {
  
  // search everything
  static async getAll(): Promise<Category[]> {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return result.rows;
  }

  // search by id
  static async getById(id: number): Promise<Category | null> {
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  // count product by category
  static async getWithProductCount(): Promise<any[]> {
    const result = await pool.query(
      `SELECT c.*, COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id
       ORDER BY c.name ASC`
    );
    return result.rows;
  }
}