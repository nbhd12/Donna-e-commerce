import type {cartItem, cartState} from "../types/cart";


const API_URL = 'http://localhost:5000/api';

export const cartApi = {
  // get cart and sned to session cookies
  async getCart(): Promise<cartState> {
    const response = await fetch(`${API_URL}/cart`, {
      credentials: 'include', 
    });
    
    if (!response.ok) {
      throw new Error('Error fetching cart');
    }
    
    return response.json();
  },

  // add to cart
  async addToCart(productId: number, quantity: number): Promise<cartState> {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ productId, quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Error adding to cart');
    }
    
    return response.json();
  },

  // update quantity
  async updateQuantity(productId: number, quantity: number): Promise<cartState> {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Error updating quantity');
    }
    
    return response.json();
  },

  // remove from cart
  async removeFromCart(productId: number): Promise<cartState> {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error removing from cart');
    }
    
    return response.json();
  },
};