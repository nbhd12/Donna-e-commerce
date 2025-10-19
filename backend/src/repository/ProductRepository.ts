import { Repository } from "../libs/repository";
import { Product } from "../types/ProductModel";

export class ProductRepository extends Repository{

  async findProduct(): Promise<Product[]> {
    const result = await this.pool.query(
      'SELECT * FROM Products Order by name ASC'
    );
    return result.rows;
  }
  
  async getById(id: number): Promise <Product | null> {
    const result = await this.pool.query(
      'SELECT * FROM PRODUCTS WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }



}
