import { Request, Response } from "express";
import { GlobalController } from "../controllers/GlobalController";
import { pool } from "../libs/database";

export class ProductController extends GlobalController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const result = await pool.query("SELECT * FROM products");
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
      res.status(500).json({ error: "Erreur lors du chargement des produits" });
    }
  }
}