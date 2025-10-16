export interface cartItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  quantity: number;
}

export interface cartState {
  items: cartItem[];
  totalQuantity: number;
  subTotal: number;
}