import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  const controller = new ProductController(req,res);
  controller.getAllProducts(req,res);
});

export default productRouter;