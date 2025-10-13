import { Request, Response } from "express";
import { CategoryRepository } from "../repository/CategoryRepository";

export class CategoryController {
  private repository = new CategoryRepository();

  public getAll(req: Request, res: Response) {
    const categories = this.repository.findAll();
    res.json(categories);
  }

  public getProductsByCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const products = this.repository.findProductsByCategory(id);

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "Catégorie introuvable ou sans produits" });
    }
  }
}
