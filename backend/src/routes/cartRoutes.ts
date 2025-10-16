import { Router } from "express";
import * as CartController from "../controllers/CartController";

const router = Router();

router.get("/", CartController.getCart);
router.post("/", CartController.addToCart);
router.put("/:id", CartController.updateCartItem);
router.delete("/:id", CartController.removeFromCart);

export default router;