import { Router } from 'express';
import { ColorController } from '../controllers/color.controller'; 
export class ColorRoutes {
    public colorController: ColorController = new ColorController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.colorController.getAllColor);
        this.router.post('/', this.colorController.createColor);
        this.router.put('/', this.colorController.updateColor);
        this.router.delete('/', this.colorController.deleteColor);
    }
}