import { Product } from "../models/ProductModel";

export class ProductRepository {
  // временные фейковые данные (позже заменишь на БД PostgreSQL)
  private products: Product[] = [
    {
      id: 1,
      name: "Everyday Handbag",
      description: "Sac à main élégant pour un usage quotidien.",
      price: 140,
      imageUrl: "https://placehold.co/300x300",
      category: "handbags",
    },
    {
      id: 2,
      name: "Mini Clutch",
      description: "Petit sac pour soirée chic.",
      price: 95,
      imageUrl: "https://placehold.co/300x300",
      category: "clutch",
    },
    {
      id: 3,
      name: "Business Tote",
      description: "Sac pratique et élégant pour le travail.",
      price: 180,
      imageUrl: "https://placehold.co/300x300",
      category: "handbags",
    },
  ];

  // получить все товары
  public findAll(): Product[] {
    return this.products;
  }

  // найти товар по ID
  public findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
