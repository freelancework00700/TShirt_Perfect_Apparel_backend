
import { NextFunction, Request, Response } from "express";

import BulkOrderDiscuss  from "../models/bulk-order-discuss.model";
import { HttpStatus } from '../utils/http-status';
import { MailHelper } from '../utils/mail-helper';
import sequelize from 'sequelize';

export class BulkOrderDiscussController extends HttpStatus {
    public mailHelper = new MailHelper();

    /** POST API: Create a bulk order discuss */
    public createBulkOrderDiscuss = async (req: Request, res: Response) => {
        try {
            
            const params = req.body;

            const bulkOrderDiscuss = await BulkOrderDiscuss.create(params);

            if (!bulkOrderDiscuss) {
                return this.sendBadRequestResponse(res, "Unable to create bulk order discuss.", bulkOrderDiscuss);
            }

            this.mailHelper.bulkOrderDiscuss(params);

            return this.sendOkResponse(res, "Thank you for reaching out to our website! Your message has been successfully submitted.", bulkOrderDiscuss);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating bulk order discuss.");
        }
    };

    /** GET API: Get all bulk order discuss */
    public getAllBulkOrderDiscuss = async (req: Request, res: Response) => {
        try {

            const params = req.query;

            // Sorting
            let column = params.sortColumn;
            if (column == null || column == '') {
                column = "id";
            }

            const direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all bulk order discuss
            const bulkOrderDiscuss = await BulkOrderDiscuss.findAll({ order: [orderBy] });

            if (!bulkOrderDiscuss.length) {
                return this.sendBadRequestResponse(res, "Record not found.", bulkOrderDiscuss);
            }

            return this.sendOkResponse(res, "Get successfully.", bulkOrderDiscuss);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching bulk order discuss.");
        }
    };
}