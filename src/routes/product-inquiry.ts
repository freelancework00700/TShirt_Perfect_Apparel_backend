import { Router } from 'express';
import { ProductInquiryController } from '../controllers/product-inquiry.controller'; 
export class ProductInquiryRoutes {
    public productInquiryController: ProductInquiryController = new ProductInquiryController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.productInquiryController.getAllProductInquiries);
        this.router.post('/', this.productInquiryController.createProductInquiry);
        this.router.delete('/', this.productInquiryController.deleteProductInquiry);
    }
}