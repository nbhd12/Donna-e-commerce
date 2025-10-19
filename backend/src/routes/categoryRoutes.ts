import { Router, Request, Response } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRoutes = Router();

categoryRoutes.get("/", (request, response) => {
  const controller = new CategoryController(request, response);
  controller.getAllCategories();
});

export default categoryRoutes;
