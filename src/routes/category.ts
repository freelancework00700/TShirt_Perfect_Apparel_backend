import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

export class CategoryRoutes {
    public categoryController: CategoryController = new CategoryController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.categoryController.getAllCategories);
        this.router.post('/', this.categoryController.createCategory);
        this.router.put('/', this.categoryController.updateCategory);
        this.router.delete('/', this.categoryController.deleteCategory);
    }
}