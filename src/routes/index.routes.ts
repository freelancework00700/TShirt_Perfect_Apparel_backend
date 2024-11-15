import { BulkOrderDiscussRoutes } from './bulk-order-discuss';
import { CategoryRoutes } from './category';
import { ColorRoutes } from './color'; 
import { GetInTouchRoutes } from './get-in-touch';
import { ProductInquiryRoutes } from './product-inquiry';
import { SizeRoutes } from './size';
import { SubCategoryRoutes } from './sub-category';
import { ProductRoutes } from './product';
import { Router } from 'express';

export class Routes {
    public router = Router();

    // Create routes instances
    private bulkOrderDiscussRoutes: BulkOrderDiscussRoutes = new BulkOrderDiscussRoutes();
    private categoryRoutes: CategoryRoutes = new CategoryRoutes();
    private colorRoutes: ColorRoutes = new ColorRoutes();
    private getInTouchRoutes: GetInTouchRoutes = new GetInTouchRoutes();
    private productInquiryRoutes: ProductInquiryRoutes = new ProductInquiryRoutes();
    private sizeRoutes: SizeRoutes = new SizeRoutes();
    private subCategoryRoutes: SubCategoryRoutes = new SubCategoryRoutes();
    private productRoutes: ProductRoutes = new ProductRoutes();

    constructor() {
        // Initialize routes
        this.router.use('/bulk-order-discuss', this.bulkOrderDiscussRoutes.router);
        this.router.use('/category', this.categoryRoutes.router);
        this.router.use('/color', this.colorRoutes.router);
        this.router.use('/get-in-touch', this.getInTouchRoutes.router);
        this.router.use('/product-inquiry', this.productInquiryRoutes.router);
        this.router.use('/size', this.sizeRoutes.router);
        this.router.use('/sub-category', this.subCategoryRoutes.router);
        this.router.use('/product', this.productRoutes.router);
    }
}