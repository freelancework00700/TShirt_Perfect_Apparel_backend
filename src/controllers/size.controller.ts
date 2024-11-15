import { Request, Response } from "express";
import Size from '../models/size.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';
import Category from '../models/category.model';
import sequelize from 'sequelize';

export class SizeController extends HttpStatus {

    /** GET API: Get all size */
    public getAllSize = async (req: Request, res: Response) => {
        try {
            const params = req.query;

            // Sorting
            let column = params.sortColumn;
            if (column == null || column == '') {
                column = "id";
            } else if (column === "category_name") {
                column = 'Category.name';
            }
           const direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all size
            const size = await Size.findAll({
                include: [
                    { model: Category, as: 'Category' }
                ],
                where: { isDeleted: false },
                order: [orderBy]
            });

            if (!size.length) {
                return this.sendBadRequestResponse(res, "Size not found.", size);
            }

            return this.sendOkResponse(res, "Size get successfully.", size);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching size.");
        }
    };

    /** POST API: Create a new size */
    public createSize = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const existingSize = await Size.findOne({ where: { name: params.name, category_id: params.category_id, isDeleted: false } });
            if (existingSize) {
                return this.sendBadRequestResponse(res, "Size already exists.", existingSize);
            }

            const size = await Size.create(params);

            if (!size) {
                return this.sendBadRequestResponse(res, "Unable to create size.", size);
            }

            return this.sendOkResponse(res, "Size create successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating size.");
        }
    };

    /** PUT API: Update a size */
    public updateSize = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const size: any = await Size.findOne({ where: { id: params.id, isDeleted: false } });
            if (!size) return this.sendBadRequestResponse(res, "Size not found.");

            const existingSize = await Size.findOne({ where: { name: params.name, id: { [Op.ne]: params.id }, isDeleted: false } });
            if (existingSize) {
                return this.sendBadRequestResponse(res, "Size already exists.", existingSize);
            }

            size.name = params.name || size.name;
            size.category_id = params.category_id || size.category_id; 
            await size.save();

            return this.sendOkResponse(res, "Size update successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating size.");
        }
    };

    /** DELETE API: Delete a size */
    public deleteSize = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const size: any = await Size.findOne({ where: { id, isDeleted: false } });
            if (!size) return this.sendBadRequestResponse(res, "size not found.");

            size.isDeleted = true;
            await size.save();

            return this.sendOkResponse(res, "Size delete successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting size.");
        }
    };
}