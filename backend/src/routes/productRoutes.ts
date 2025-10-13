import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getOne.bind(controller));

export default router;
