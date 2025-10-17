import { Request, Response } from "express";
import { pool } from "../libs/database";
import { GlobalController } from "./GlobalController";

export class CategoryController extends GlobalController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const result = await pool.query("SELECT * FROM categories");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors du chargement des catégories" });
    }
  }
}