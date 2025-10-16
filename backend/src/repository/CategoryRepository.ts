import { Product } from "../../../frontend/src/types/ProductModel";

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

  // @tatiana, I renamed imageUrl to "image" to match Ingrid's code, i also added another parameter called 'stock' to match ingrid's model
  private products: Product[] = [
    { id: 1, name: "Everyday Handbag", description: "Sac à main élégant", price: 140, image: "https://placehold.co/300x300", category: "Handbags", stock:1 },
    { id: 2, name: "Mini Clutch", description: "Petit sac de soirée", price: 95, image: "https://placehold.co/300x300", category: "Clutch", stock:1 },
    { id: 3, name: "Business Tote", description: "Sac pratique et élégant", price: 180, image: "https://placehold.co/300x300", category: "Totes", stock:1 },
    { id: 4, name: "Classic Handbag", description: "Style intemporel", price: 160, image: "https://placehold.co/300x300", category: "Handbags", stock:1 },
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
    return this.products.filter((p) => p.category === category.name); // this needs to be corrected
  }
}
