import type { Product } from '../types/ProductModel';

const API_URL = 'http://localhost:5000/api';

export const productService = {
  // get all products
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Error fetching products');
    }
    
    return response.json();
  },

  // get product by ID
  async getById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Error fetching product');
    }
    
    return response.json();
  },

  // get recent products (for homepage)
  async getRecent(limit: number = 4): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products?limit=${limit}&sort=recent`);
    
    if (!response.ok) {
      throw new Error('Error fetching recent products');
    }
    
    return response.json();
  },

  // get products by category
  async getByCategory(categoryId: string): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products?category=${categoryId}`);
    
    if (!response.ok) {
      throw new Error('Error fetching products by category');
    }
    
    return response.json();
  },
};