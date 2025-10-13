import pool from '../Database';
import { Order } from '../models/Order';


export class OrderModel {
  
  // create order
  static async create(order: Order): Promise<Order> {
    const { user_id, produit_id, quantity, unit_price, total_price } = order;
    
    const result = await pool.query(
      `INSERT INTO orders (user_id, produit_id, quantity, unit_price, total_price, status) 
       VALUES ($1, $2, $3, $4, $5, 'pending') 
       RETURNING *`,
      [user_id, produit_id, quantity, unit_price, total_price]
    );
    
    return result.rows[0];
  }

  // search order by user
  static async getByUserId(userId: number): Promise<Order[]> {
    const result = await pool.query(
      `SELECT o.*, 
              p.name as product_name, 
              p.image as product_image,
              p.description as product_description
       FROM orders o
       LEFT JOIN products p ON o.produit_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  // search order by ID
  static async getById(orderId: number): Promise<Order | null> {
    const result = await pool.query(
      `SELECT o.*, 
              p.name as product_name, 
              p.image as product_image,
              p.description as product_description
       FROM orders o
       LEFT JOIN products p ON o.produit_id = p.id
       WHERE o.id = $1`,
      [orderId]
    );
    return result.rows[0] || null;
  }

  // update status
  static async updateStatus(orderId: number, status: string): Promise<void> {
    await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      [status, orderId]
    );
  }

  // search all admin
  static async getAll(): Promise<Order[]> {
    const result = await pool.query(
      `SELECT o.*, 
              p.name as product_name,
              u.first_name, u.last_name, u.email
       FROM orders o
       LEFT JOIN products p ON o.produit_id = p.id
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    return result.rows;
  }
}