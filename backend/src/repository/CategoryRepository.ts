

import  pool  from "../libs/database";

export class ProductRepository {
  async findAll() {
    const query = `
      SELECT p.*, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.id;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}