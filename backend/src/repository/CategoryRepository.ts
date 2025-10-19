import { Repository } from '../libs/repository';
import { Category } from '../types/CategoryModel';

export class CategoryRepository extends Repository {
  
  async findAll(): Promise<Category[]> {
    const result = await this.pool.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return result.rows;
  }

  
  async getById(id: number): Promise<Category | null> {
    const result = await this.pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  // count product by category
  async getWithProductCount(): Promise<any[]> {
    const result = await this.pool.query(
      `SELECT c.*, COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id
       ORDER BY c.name ASC`
    );
    return result.rows;
  }
}