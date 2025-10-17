import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.get("/", (req, res) => {
  const controller = new CategoryController(req, res);
  controller.getAllCategories(req, res);
});

export default categoryRouter;
