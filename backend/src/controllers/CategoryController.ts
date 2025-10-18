
import { Request, Response } from "express";
import pool from "../libs/database";

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const result = await pool.query("SELECT * FROM categories");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors du chargement des catégories" });
    }
  }

  async getCategoriesById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur getCategoryById:", error);
    res.status(500).json({ message: "Erreur lors du chargement de la catégorie" });
  }
}
}