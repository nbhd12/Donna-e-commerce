import { pool } from "../libs/database";

export class ProductRepository {

  async findAll() {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.dimension,
        p.faq,
        p.stock,
        p.image,
        p.quantity,
        c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY c.name, p.name;
    `);
    return result.rows;
  }

  
  async findByCategory(categoryName: string) {
    const result = await pool.query(
      `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image,
        p.stock,
        c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE LOWER(c.name) = LOWER($1)
      ORDER BY p.name;
      `,
      [categoryName]
    );
    return result.rows;
  }


  async findById(productId: number) {
    const result = await pool.query(
      `
      SELECT 
        p.*,
        c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1;
      `,
      [productId]
    );
    return result.rows[0];
  }
}
