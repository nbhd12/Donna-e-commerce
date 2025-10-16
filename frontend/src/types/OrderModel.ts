export interface orderType {
  id?: number;
  status: string;
  created_at?: Date;
  user_id: number;
  total_price: number;
  quantity: number;
  produit_id: number;  
  unit_price: number;
  product_name?: string;
  product_image?: string;
}

export default class Order {
  id?: number;
  status: string;
  created_at?: Date;
  user_id: number;
  total_price: number;
  quantity: number;
  produit_id: number;  
  unit_price: number;
  product_name?: string;
  product_image?: string;

  constructor(
    status: string,
    user_id: number,
    total_price: number,
    quantity: number,
    produit_id: number,
    unit_price: number,
    product_name?: string,
    product_image?: string,
    created_at?: Date,
    id?: number
  ) {
    this.status = status;
    this.user_id = user_id;
    this.total_price = total_price;
    this.quantity = quantity;
    this.produit_id = produit_id;
    this.unit_price = unit_price;
    this.product_name = product_name;
    this.product_image = product_image;
    this.created_at = created_at;
    this.id = id;
  }

  static fromRow = (row: orderType): Order => {
    return new Order(
      row.status,
      row.user_id,
      row.total_price,
      row.quantity,
      row.produit_id,
      row.unit_price,
      row.product_name,
      row.product_image,
      row.created_at,
      row.id
    );
  };

  serialize = (): Record<string, number | string | Date | undefined> => {
    return {
      id: this.id,
      status: this.status,
      created_at: this.created_at,
      user_id: this.user_id,
      total_price: this.total_price,
      quantity: this.quantity,
      produit_id: this.produit_id,
      unit_price: this.unit_price,
      product_name: this.product_name,
      product_image: this.product_image,
    };
  };

  
  getId = (): number | undefined => this.id;
  getStatus = (): string => this.status;
  getCreatedAt = (): Date | undefined => this.created_at;
  getUserId = (): number => this.user_id;
  getTotalPrice = (): number => this.total_price;
  getQuantity = (): number => this.quantity;
  getProduitId = (): number => this.produit_id;
  getUnitPrice = (): number => this.unit_price;
  getProductName = (): string | undefined => this.product_name;
  getProductImage = (): string | undefined => this.product_image;
}