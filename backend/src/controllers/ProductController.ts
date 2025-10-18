import { Request, Response } from "express";
import pool from "../libs/database";
import { GlobalController } from "./GlobalController";

export class ProductController extends GlobalController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const result = await pool.query(`
        SELECT p.*, c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.id
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors du chargement des produits" });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT p.*, c.name AS category_name
         FROM products p
         JOIN categories c ON p.category_id = c.id
         WHERE p.id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors du chargement du produit" });
    }
  }
}