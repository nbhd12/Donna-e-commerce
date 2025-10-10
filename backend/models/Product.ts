import pool from '../config/Database';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  dimension?: string; 
  faq?: string;        
  stock: number;
  image?: string;
  category_id: number;
  quantity?: number;      
  category_name?: string;
  created_at?: Date;
}

export class ProductModel {
  
  // search tous les produits
  static async getAll(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ORDER BY p.created_at DESC`
    );
    return result.rows;
  }

  // search id by FAQ and dimensions
  static async getById(id: number): Promise<Product | null> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name, c.description as category_description
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  // search by category
  static async getByCategory(categoryId: number): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.category_id = $1 
       ORDER BY p.created_at DESC`,
      [categoryId]
    );
    return result.rows;
  }

  // search most recent products
  static async getRecent(limit: number = 8): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ORDER BY p.created_at DESC 
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  // search by name
  static async search(searchTerm: string): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.name ILIKE $1 OR p.description ILIKE $1
       ORDER BY p.created_at DESC`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  }

  // update stock
  static async updateStock(id: number, quantity: number): Promise<void> {
    await pool.query(
      'UPDATE products SET stock = stock - $1 WHERE id = $2',
      [quantity, id]
    );
  }
}