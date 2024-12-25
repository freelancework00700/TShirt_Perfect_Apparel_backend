import { Request, Response } from "express";
import { HttpStatus } from '../utils/http-status';
import Product from '../models/product.model';
import ProductImages from '../models/product-images.model';
import Color from '../models/color.model';
import Size from '../models/size.model';
import SubCategory from '../models/sub-category.model';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';
import Category from '../models/category.model';
import sequelize from 'sequelize';
import SizeChart from "../models/size-chart.model";

export class ProductController extends HttpStatus {

    /** GET API: Get all Products */
    public getAllProducts = async (req: Request, res: Response) => {
        try {
            const query = req.query;

            const where: any = {};
            where[Op.and] = [];

            where[Op.and].push({ isDeleted: false });

            // Sub category wise filter
            if (query.subcategory_id) {
                where[Op.and].push({ subcategory_id: query.subcategory_id });
            }

            // Status wise filter
            if (query.status) {
                where[Op.and].push({ status: query.status });
            }

            // Category wise filter
            if (query.category_id) {
                where[Op.and].push({ category_id: query.category_id });
            }

            // Color wise filter
            if (query.color_id) {
                where[Op.and].push({ color_id: query.color_id });
            }

            // Size wise filter
            if (query.size_id) {
                where[Op.and].push({ size_id: query.size_id });
            }

            // Sorting
            let column = query.sortColumn;
            if (column == null || column == '') {
                column = "id";
            } else if (column === 'category_name') {
                column = "Category.name";
            }
            const direction = query.sortDirection == null || query.sortDirection == "" ? "DESC" : query.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all products
            const products: any = await Product.findAll({
                include: [
                    { model: ProductImages, as: 'ProductImages', required: false, where: { isDeleted: false } },
                    { model: Category, as: 'Category' },
                    { model: SubCategory, as: 'SubCategory' },
                    { 
                        model: SizeChart,
                        where: { isDeleted: false },
                        include: [
                            { model: Size }
                        ]
                    }
                ],
                where,
                order: [orderBy]
            });

            if (!products.length) {
                return this.sendBadRequestResponse(res, "Products not found.", products);
            }

            for (const product of products) {
                // Add size data
                if (product.size_ids) {
                    const sizes = await Size.findAll({
                        where: {
                            id: {
                                [Op.in]: product.size_ids,
                            }
                        }
                    });
                    product.dataValues.Sizes = sizes;
                } else {
                    product.dataValues.Sizes = [];
                }

                // Add color data
                if (product.color_ids) {
                    const colors = await Color.findAll({
                        where: {
                            id: {
                                [Op.in]: product.color_ids,
                            }
                        }
                    });
                    product.dataValues.Colors = colors;
                } else {
                    product.dataValues.Colors = [];
                }
            }

            return this.sendOkResponse(res, "Products get successfully.", products);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching products.");
        }
    };

    /** POST API: Create a new Product */
    public createProduct = async (req: Request, res: Response) => {
        try {
            const params = req.body;
            const files = req.files as Express.Multer.File[];

            // Conver size id string to array
            params.size_ids = params.size_ids.split(',').map(Number);
            
            // Conver color id string to array
            params.color_ids = params.color_ids.split(',').map(Number);
            
            // Create product
            const product: any = await Product.create(params);

            // Convert size chart in array
            params.size_chart = JSON.parse(params.size_chart);

            // Handle size chart
            const size_chart = [];
            for (const element of params.size_chart) {
                const params = {
                    ...element,
                    product_id: product.id
                }
                size_chart.push(params);
            }

            // Create size chart
            await SizeChart.bulkCreate(size_chart);
            
            // Handle multiple images
            const productImages = [];
            for (const file of files) {
                const images = {
                    product_id: product.id,
                    fileName: file.originalname,
                    fileType: file.originalname.split('.').pop(),
                    contentType: file.mimetype,
                    fileSize: file.size,
                    sysFileName: file.filename,
                }

                productImages.push(images);
            }

            // Create product images
            await ProductImages.bulkCreate(productImages);

            if (!product) {
                return this.sendBadRequestResponse(res, "Unable to create product.", product);
            }

            return this.sendOkResponse(res, " Product create successfully.", product);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error creating product.");
        }
    };

    /** PUT API: Update a product */
    public updateProduct = async (req: Request, res: Response) => {
        try {
            const params = req.body;
            const files = req.files as Express.Multer.File[];

            const product: any = await Product.findOne({ where: { id: params.id } });
            if (!product) return this.sendBadRequestResponse(res, "Product not found.");

            if (files && files.length > 0) {

                const productImage: any = await ProductImages.findAll({ where: { product_id: product.id } });
                if (productImage.length > 0) {
                    for (const image of productImage) {
                        // Delete imange in folder
                        const oldImagePath =  path.join(__dirname,`../product-image/${image.sysFileName}`);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                }

                // Soft delete images
                await ProductImages.update({ isDeleted: true }, { where: { product_id: product.id } });

                // Handle multiple images
                const productImages = [];
                for (const file of files) {
                    const images = {
                        product_id: product.id,
                        fileName: file.originalname,
                        fileType: file.originalname.split('.').pop(),
                        contentType: file.mimetype,
                        fileSize: file.size,
                        sysFileName: file.filename,
                    }

                    productImages.push(images);
                }

                // Create product images
                await ProductImages.bulkCreate(productImages);
            }

            // Conver size id string to array
            if (params.size_ids != null && params.size_ids != "") {
                params.size_ids = params.size_ids.split(',').map(Number);
            }

            // Conver color id string to array
            if (params.color_ids != null && params.color_ids != "") {
                params.color_ids = params.color_ids.split(',').map(Number);
            }

            if (params.size_chart != null && params.size_chart != "") {

                // Delete exisitng size chart
                await SizeChart.update({ isDeleted: true }, { where: { product_id: product.id } });
                
                // Convert size chart in array
                params.size_chart = JSON.parse(params.size_chart);

                // Handle size chart
                const size_chart = [];
                for (const element of params.size_chart) {
                    const sizeChartParams = {
                        ...element,
                        product_id: params.id
                    }
                    size_chart.push(sizeChartParams);
                }

                // Create size chart
                await SizeChart.bulkCreate(size_chart);
            }

            // Update product
            await product.update(params);

            return this.sendOkResponse(res, "Product update successfully.", product);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating product.");
        }
    };

    /** DELETE API: Delete a product */
    public deleteProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const product: any = await Product.findOne({ where: { id, isDeleted: false } });
            if (!product) return this.sendBadRequestResponse(res, "Product not found.");

            const productImage: any = await ProductImages.findAll({ where: { product_id: product.id } });
            if (productImage.length > 0) {
                for (const image of productImage) {
                    // Delete imange in folder
                    const oldImagePath = path.resolve(`./public/product-image/${image.sysFileName}`);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            // Image soft delete
            await ProductImages.update({ isDeleted: true }, { where: { product_id: product.id } });

            // Soft delete size chart
            await SizeChart.update({ isDeleted: true }, { where: { product_id: product.id } });

            product.isDeleted = true;
            await product.save();

            return this.sendOkResponse(res, "Product delete successfully.", product);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting product.");
        }
    };

}