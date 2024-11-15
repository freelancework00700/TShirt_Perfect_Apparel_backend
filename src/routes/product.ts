import { Router } from 'express';
import  { ProductController } from '../controllers/product.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';


export class ProductRoutes {
    public productController: ProductController = new ProductController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {

        const imagePath = path.join(__dirname,'../product-image');

        const storage = multer.diskStorage({
            destination: (req: any, file: any, cb: any) => {

                if (!fs.existsSync(imagePath)) {
                    fs.mkdirSync(imagePath);
                }

                cb(null, imagePath);
            },
            filename: (req: any, file: any, cb: any) => {
                const ext = file.originalname.split('.').pop();
                cb(null, `${v4()}.${ext}`);
            }
        });

        const upload = multer({ storage });

        this.router.get('/', this.productController.getAllProducts);
        this.router.post('/', upload.array('images'), this.productController.createProduct);
        this.router.put('/', upload.array('images'), this.productController.updateProduct);
        this.router.delete('/', this.productController.deleteProduct);
    }
}