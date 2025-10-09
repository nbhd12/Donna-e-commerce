import { Request, Response } from "express";
import { ProductRepository } from "../repository/ProductRepository";

export class ProductController {
  private repository = new ProductRepository();

  // метод для получения списка всех товаров
  public getAll(req: Request, res: Response) {
    const products = this.repository.findAll();
    res.json(products);
  }

  // метод для получения одного товара по ID
  public getOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const product = this.repository.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Produit non trouvé" });
    }
  }
}
