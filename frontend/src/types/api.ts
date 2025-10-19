export interface User{
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
}


export interface Category{
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export interface Product{
  id: number;
  name: string;
  description?: string;
  price: number;
  dimension?: string;
  faq?: string;
  stock: number;
  image?: string;
  category_id: number;
  created_at?: string;
  is_new_arrival: boolean;
  is_best_seller: boolean;
}