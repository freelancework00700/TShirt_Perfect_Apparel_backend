import { Request, Response } from "express";
import GetInTouch from '../models/get-in-touch.model';
import { HttpStatus } from '../utils/http-status';
import { MailHelper } from '../utils/mail-helper';
import sequelize from 'sequelize';

export class GetInTouchController extends HttpStatus {
    public mailHelper = new MailHelper();

    /** POST API: Create a get in touch */
    public createGetInTouch = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const getInTouch = await GetInTouch.create(params);

            if (!getInTouch) {
                return this.sendBadRequestResponse(res, "Unable to create get in touch.", getInTouch);
            }

            this.mailHelper.getInTouch(params);

            return this.sendOkResponse(res, "Thank you for reaching out to our website! Your email address has been successfully submitted.", getInTouch);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating get in touch.");
        }
    };

    /** GET API: Get all get in touch */
    public getAllGetInTouch = async (req: Request, res: Response) => {
        try {
            const params = req.query;

            // Sorting
            let column = params.sortColumn;
            if (column == null || column == '') {
                column = "id";
            }

          const  direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all get-in-touch
            const getInTouch = await GetInTouch.findAll({ order: [orderBy] });

            if (!getInTouch.length) {
                return this.sendBadRequestResponse(res, "Record not found.", getInTouch);
            }

            return this.sendOkResponse(res, "Get successfully.", getInTouch);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching get in touch.");
        }
    };

    /** DELETE API: Delete get in touch */
    public deleteGetInTouch = async (req: Request, res: Response) => {
        try {

            const { id } = req.query;

            const getInTouch: any = await GetInTouch.findOne({ where: { id } });
            if (!getInTouch) return this.sendBadRequestResponse(res, "Get in touch not found.");

            await GetInTouch.destroy({ where: { id } });

            return this.sendOkResponse(res, "Size delete successfully.", getInTouch);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching get in touch.");
        }
    };
}