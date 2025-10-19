export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  dimension?: string; 
  faq?: string;        
  stock: number;
  image?: string;
  category: string; 
  quantity?: number;      
  category_name?: string;
  created_at?: Date;
}

// export default class ProductModel {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   dimension?: string; 
//   faq?: string;        
//   stock: number;
//   image?: string;
//   category: string;
//   quantity?: number;      
//   category_name?: string;
//   created_at?: Date;
// }

//   constructor(
//     name: string,
//     description: string,
//     price: number,
//     stock: number,
//     category: string, // I renamed it to category from category_id and changed the type to string- Nupur
//     dimension?: string,
//     faq?: string,
//     image?: string,
//     quantity?: number,
//     category_name?: string,
//     created_at?: Date,
//     id?: number
//   ) {
//     this.name = name;
//     this.description = description;
//     this.price = price;
//     this.stock = stock;
//     this.category = category;
//     this.dimension = dimension;
//     this.faq = faq;
//     this.image = image;
//     this.quantity = quantity;
//     this.category_name = category_name;
//     this.created_at = created_at;
//     this.id = id;
//   }

//   static fromRow = (row: Product): ProductModel => {
//     return new ProductModel(
//       row.name,
//       row.description,
//       row.price,
//       row.stock,
//       row.category,
//       row.dimension,
//       row.faq,
//       row.image,
//       row.quantity,
//       row.category_name,
//       row.created_at,
//       row.id
//     );
//   };

//   serialize = (): Record<string, string | number | Date | undefined> => {
//     return {
//       id: this.id,
//       name: this.name,
//       description: this.description,
//       price: this.price,
//       dimension: this.dimension,
//       faq: this.faq,
//       stock: this.stock,
//       image: this.image,
//       category: this.category, // I renamed it to category from category_id - Nupur
//       quantity: this.quantity,
//       category_name: this.category_name,
//       created_at: this.created_at,
//     };
//   };

  
//   getId = (): number | undefined => this.id;
//   getName = (): string => this.name;
//   getDescription = (): string => this.description;
//   getPrice = (): number => this.price;
//   getDimension = (): string | undefined => this.dimension;
//   getFaq = (): string | undefined => this.faq;
//   getStock = (): number => this.stock;
//   getImage = (): string | undefined => this.image;
//   getCategoryId = (): string => this.category; 
//   getQuantity = (): number | undefined => this.quantity;
//   getCategoryName = (): string | undefined => this.category_name;
//   getCreatedAt = (): Date | undefined => this.created_at;
// }