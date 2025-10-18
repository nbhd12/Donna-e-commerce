import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRouter = Router();
const controller = new CategoryController();


categoryRouter.get("/", (req, res) => controller.getAllCategories(req, res));
categoryRouter.get("/:id", (req, res) => controller.getCategoriesById(req, res));


export default categoryRouter;