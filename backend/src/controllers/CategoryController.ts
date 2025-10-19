import { CategoryRepository } from "../repository/CategoryRepository";
import { Controller } from "../libs/controller";

export class CategoryController extends Controller {
  private repository: CategoryRepository;

  constructor(req: any, res: any) {
    super(req, res);
    this.repository = new CategoryRepository();
  }

  async getAllCategories() {
    try {
      const categories = await this.repository.findAll();
      this.response.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error("Error:", error);
      this.response.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }
  }

  async getCategoryById() {
    try {
      const id = parseInt(this.request.params.id);
      if (isNaN(id)) {
        this.response.status(400).json({
          success: false,
          message: "Invalid ID",
        });
        return;
      }

      const category = await this.repository.getById(id);

      if (!category) {
        this.response.status(400).json({
          success: false,
          message: "Category not found",
        });
        return;
      }
      this.response.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.error("Error:", error);
      this.response.status(500).json({
        success: false,
        message: "Failed to fetch category",
      });
    }
  }
}
