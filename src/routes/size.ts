import { Router } from 'express';
import { SizeController } from '../controllers/size.controller';

export class SizeRoutes {
    public sizeController: SizeController = new SizeController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.sizeController.getAllSize);
        this.router.post('/', this.sizeController.createSize);
        this.router.put('/', this.sizeController.updateSize);
        this.router.delete('/', this.sizeController.deleteSize);
    }
}