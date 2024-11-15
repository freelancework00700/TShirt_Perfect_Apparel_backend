import { Router } from 'express';
import { BulkOrderDiscussController } from '../controllers/bulk-order-discuss.controller';

export class BulkOrderDiscussRoutes {
    public bulkOrderDiscussController: BulkOrderDiscussController = new BulkOrderDiscussController();
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', this.bulkOrderDiscussController.getAllBulkOrderDiscuss);
        this.router.post('/', this.bulkOrderDiscussController.createBulkOrderDiscuss);
    }
}