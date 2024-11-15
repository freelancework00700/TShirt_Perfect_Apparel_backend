import { Request, Response } from "express";
import SubCategory from '../models/sub-category.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';
import Category from '../models/category.model';
import sequelize from 'sequelize';

export class SubCategoryController extends HttpStatus {

    /** GET API: Get all sub-categories */
    public getAllSubCategories = async (req: Request, res: Response) => {
        try {

            const params = req.query;

            if (!params.id) {
                return this.sendBadRequestResponse(res, "Category ID is required.");
            }

            // Sorting
            let column = params.sortColumn;
            if (column == null || column == '') {
                column = "id";
            }

            const direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all sub categories
            const subCategories = await SubCategory.findAll({
                include: [
                    { model: Category, as: 'Category' }
                ],
                where: { isDeleted: false, category_id: params.id },
                order: [orderBy]
            });

            if (!subCategories.length) {
                return this.sendBadRequestResponse(res, "Sub Categories not found.", subCategories);
            }

            return this.sendOkResponse(res, "Sub Categories get successfully.", subCategories);
        } catch (error) {
            console.log('error:::: ', error);
            return this.sendInternalServerResponse(res, "Error fetching sub-categories.");
        }
    };

    /** POST API: Create a new sub-category */
    public createSubCategory = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const existingSubCategory = await SubCategory.findOne({ where: { name: params.name, isDeleted: false } });
            if (existingSubCategory) {
                return this.sendBadRequestResponse(res, "Sub Category already exists.", existingSubCategory);
            }

            const subCategory = await SubCategory.create(params);

            if (!subCategory) {
                return this.sendBadRequestResponse(res, "Unable to create sub-category.", subCategory);
            }

            return this.sendOkResponse(res, " Sub Category create successfully.", subCategory);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating sub category.");
        }
    };

    /** PUT API: Update a sub-category */
    public updateSubCategory = async (req: Request, res: Response) => {
        try {
            const params = req.body;

            const subCategory: any = await SubCategory.findOne({ where: { id: params.id, isDeleted: false } });
            if (!subCategory) return this.sendBadRequestResponse(res, "Sub Category not found.");

            const existingCategory = await SubCategory.findOne({ where: { name: params.name, id: { [Op.ne]: params.id }, isDeleted: false } });
            if (existingCategory) {
                return this.sendBadRequestResponse(res, "Sub Category already exists.", existingCategory);
            }

            subCategory.category_id = params.category_id || subCategory.category_id;
            subCategory.name = params.name || subCategory.name;
            await subCategory.save();

            return this.sendOkResponse(res, "Sub Category update successfully.", subCategory);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating sub-category.");
        }
    };

    /** DELETE API: Delete a sub-category */
    public deleteSubCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const subCategory: any = await SubCategory.findOne({ where: { id, isDeleted: false } });
            if (!subCategory) return this.sendBadRequestResponse(res, "Sub Category not found.");

            subCategory.isDeleted = true;
            await subCategory.save();

            return this.sendOkResponse(res, "Sub Category delete successfully.", subCategory);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting sub-category.");
        }
    };
}