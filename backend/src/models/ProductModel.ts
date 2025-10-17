export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  dimension: string;
  faq: string;
  stock: number;
  image: string;
  category_id: number;
  created_at: Date;
  quantity: number;
}
