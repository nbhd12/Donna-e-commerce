import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router()

productRoutes.get("/", (request,response) =>{
    const controller = new ProductController(request,response);
    controller.getAllProducts();
});

productRoutes.get("/:id", (request,response) =>{
    const controller = new ProductController(request,response);
    controller.getProductsById();
});


export default productRoutes;

