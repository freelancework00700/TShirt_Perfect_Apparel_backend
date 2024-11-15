import { DataTypes, Model, Sequelize } from 'sequelize';
import ProductImages from './product-images.model';
import Color from './color.model';
import Size from './size.model';
import SubCategory from './sub-category.model';
import Category from './category.model';

class Product extends Model {
    static initModel(connection: Sequelize) {
        Product.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                category_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: false
                },
                subcategory_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    defaultValue: '0.00'
                },
                color_ids: {
                    type: DataTypes.JSON,
                    allowNull: true
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                sleeve: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                fit: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                fabric: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                sales_package: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                pack_of: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                style_code: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                neck_type: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                ideal_for: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                size_ids: {
                    type: DataTypes.JSON,
                    allowNull: true
                },
                pattern: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                suitable_for: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                reversible: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                fabric_care: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                net_quantity: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                status: {
                    type: DataTypes.ENUM('New Drops', 'Most Trending', 'Not Display'),
                    allowNull: true
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                discount_price: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                final_price: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true
                },
                inStock: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true
                },
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                sequelize: connection,
                tableName: 'product',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {
        Product.hasMany(ProductImages, { foreignKey: 'product_id', as: 'ProductImages', sourceKey: 'id', onDelete: 'CASCADE' });
        Product.belongsTo(SubCategory, { foreignKey: 'subcategory_id', as: 'SubCategory', targetKey: 'id' });
        Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Category', targetKey: 'id' });
    
    }
}

export default Product;