import { Product } from "../models/ProductModel";

interface Category {
  id: number;
  name: string;
  description: string;
}

export class CategoryRepository {
  private categories: Category[] = [
    { id: 1, name: "Handbags", description: "Sacs à main élégants pour tous les jours" },
    { id: 2, name: "Clutch", description: "Petits sacs de soirée chic" },
    { id: 3, name: "Totes", description: "Grands sacs pratiques pour le travail" },
  ];

  
  private products: Product[] = [
    { id: 1, name: "Everyday Handbag", description: "Sac à main élégant", price: 140, imageUrl: "https://placehold.co/300x300", category: "Handbags" },
    { id: 2, name: "Mini Clutch", description: "Petit sac de soirée", price: 95, imageUrl: "https://placehold.co/300x300", category: "Clutch" },
    { id: 3, name: "Business Tote", description: "Sac pratique et élégant", price: 180, imageUrl: "https://placehold.co/300x300", category: "Totes" },
    { id: 4, name: "Classic Handbag", description: "Style intemporel", price: 160, imageUrl: "https://placehold.co/300x300", category: "Handbags" },
  ];

  public findAll(): Category[] {
    return this.categories;
  }

 
  public findById(id: number): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }


  public findProductsByCategory(id: number): Product[] {
    const category = this.findById(id);
    if (!category) return [];
    return this.products.filter((p) => p.category === category.name);
  }
}
