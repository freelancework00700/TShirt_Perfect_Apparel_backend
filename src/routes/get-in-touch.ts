import { Router } from 'express';
import { GetInTouchController } from '../controllers/get-in-touch.controller'; 
export class GetInTouchRoutes {
    public getInTouchController: GetInTouchController = new GetInTouchController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.getInTouchController.getAllGetInTouch);
        this.router.post('/', this.getInTouchController.createGetInTouch);
        this.router.delete('/', this.getInTouchController.deleteGetInTouch);
    }
}