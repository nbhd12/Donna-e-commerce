import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const controller = new ProductController(req,res);
   await controller.getAllProducts(req,res);
});

productRouter.get("/:id",  async(req, res) => {
  const controller = new ProductController( req,res);
    await controller.getProductById(req, res); 
})

export default productRouter;