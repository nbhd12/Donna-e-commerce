import { type User } from '../types/UserModel';

const API_URL = 'http://localhost:5000/api';

interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}

export const authService = {
  // I created a async fonctions for sign up, sign out and sing in authentication

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error signing up');
    }
    
    return response.json();
  },

  // sign in
  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error signing in');
    }
    
    return response.json();
  },

  // sign out
  async signOut(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error signing out');
    }
  },

  // to get current user
  async getCurrentUser(): Promise<User | null> {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  },
};