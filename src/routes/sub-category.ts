import { Router } from 'express';
import { SubCategoryController } from '../controllers/sub-category.controller';

export class SubCategoryRoutes {
    public subCategoryController: SubCategoryController = new SubCategoryController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.subCategoryController.getAllSubCategories);
        this.router.post('/', this.subCategoryController.createSubCategory);
        this.router.put('/', this.subCategoryController.updateSubCategory);
        this.router.delete('/', this.subCategoryController.deleteSubCategory);
    }
}