import { Router } from "express";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import userRoutes from "./userRoutes";

const router = Router ();

router.use ("/api/products", productRoutes);
router.use ("/api/category", categoryRoutes);
router.use ("/api/user", userRoutes);

export default router;

