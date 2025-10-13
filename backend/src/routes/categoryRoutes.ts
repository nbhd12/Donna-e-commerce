import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();
const controller = new CategoryController();


router.get("/", controller.getAll.bind(controller));


router.get("/:id", controller.getProductsByCategory.bind(controller));

export default router;
