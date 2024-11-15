import { Request, Response } from "express";
import Color from '../models/color.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

export class ColorController extends HttpStatus {

    /** GET API: Get all color */
    public getAllColor = async (req: Request, res: Response) => {
        try {

            const params = req.query;
            // Sorting
            let column = params.sortColumn;
            if (column == null || column == '') {
                column = "id";
            }

           const direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all color
            const color = await Color.findAll({ where: { isDeleted: false }, order: [orderBy] });

            if (!color.length) {
                return this.sendBadRequestResponse(res, "Color not found.", color);
            }

            return this.sendOkResponse(res, "Color get successfully.", color);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching color.");
        }
    };

    /** POST API: Create a new color */
    public createColor = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const existingColor = await Color.findOne({ where: { name: params.name, isDeleted: false } });
            if (existingColor) {
                return this.sendBadRequestResponse(res, "Color already exists.", existingColor);
            }

            const color = await Color.create(params);

            if (!color) {
                return this.sendBadRequestResponse(res, "Unable to create color.", color);
            }

            return this.sendOkResponse(res, "Color create successfully.", color);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating color.");
        }
    };

    /** PUT API: Update a color */
    public updateColor = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const color: any = await Color.findOne({ where: { id: params.id, isDeleted: false } });
            if (!color) return this.sendBadRequestResponse(res, "Color not found.");

            const existingColor = await Color.findOne({ where: { name: params.name, id: { [Op.ne]: params.id }, isDeleted: false } });
            if (existingColor) {
                return this.sendBadRequestResponse(res, "Color already exists.", existingColor);
            }

            color.name = params.name || color.name;
            await color.save();

            return this.sendOkResponse(res, "Color update successfully.", color);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating color.");
        }
    };

    /** DELETE API: Delete a color */
    public deleteColor = async (req: Request, res: Response) => {
        try {

            const { id } = req.query;

            const color: any = await Color.findOne({ where: { id, isDeleted: false } });
            if (!color) return this.sendBadRequestResponse(res, "Color not found.");

            color.isDeleted = true;
            await color.save();

            return this.sendOkResponse(res, "Color delete successfully.", color);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting color.");
        }
    };
}