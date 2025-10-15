import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();
const controller = new CategoryController();

router.get("/", (req, res) => {
  const controller = new CategoryController();

  controller.getAll(req, res);
});

// router.get("/:id", controller.getProductsByCategory.bind(controller));

export default router;
