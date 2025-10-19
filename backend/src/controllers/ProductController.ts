import { ProductRepository } from "../repository/ProductRepository";
import { Controller } from "../libs/controller";

export class ProductController extends Controller {
  private repository : ProductRepository;

  constructor (req: any, res: any) {
    super(req,res);
    this.repository = new ProductRepository();
  }

  async getAllProducts() {
    try{
      const products = await this.repository.findProduct();
      this.response.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("Error:", error);
      this.response.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
 }

 async getProductsById(){
  try{
    const id = parseInt(this.request.params.id);
    if(isNaN(id)){
      this.response.status(400).json({
        success: false,
        message: "Invalid ID",
      });
      return;
    }

    const product = await this.repository.getById(id);

    if(!product) {
      this.response.status(400).json({
        success: false,
        message:"Product not found",
      });
      return;
    }
    this.response.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error:", error);
    this.response.status(500).json({
      success:false,
      message: "Failed to fetch categry",
    });
  }
 }
}
