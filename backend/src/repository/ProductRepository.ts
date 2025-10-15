import { Product } from "../types/ProductModel";

export class ProductRepository {

  private products: Product[] = [
    {
      id: 1,
      name: "Everyday Handbag",
      description: "Sac à main élégant pour un usage quotidien.",
      price: 140,
      image: "https://placehold.co/300x300", // @tatiana - change imageUrl to image
      category: "handbags",
      stock:1
    },
    {
      id: 2,
      name: "Mini Clutch",
      description: "Petit sac pour soirée chic.",
      price: 95,
      image: "https://placehold.co/300x300", // @tatiana - change imageUrl to image
      category: "clutch",
      stock:1
    },
    {
      id: 3,
      name: "Business Tote",
      description: "Sac pratique et élégant pour le travail.",
      price: 180,
      image: "https://placehold.co/300x300", // @tatiana - change imageUrl to image
      category: "handbags",
      stock:1
    },
  ];


  public findAll(): Product[] {
    return this.products;
  }

  public findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
