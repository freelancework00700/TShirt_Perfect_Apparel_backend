import { DataTypes, Model, Sequelize } from 'sequelize';
import Product from './product.model';

class ProductInquiry extends Model {
    static initModel(connection: Sequelize) {
        ProductInquiry.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                product_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: true
                },
                color_ids: {
                    type: DataTypes.JSON,
                    allowNull: true
                },
                size_ids: {
                    type: DataTypes.JSON,
                    allowNull: true
                },
                quantity: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                inquiry_message: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                name: {
                    type: DataTypes.STRING(500),
                    allowNull: true
                },
                email: {
                    type: DataTypes.STRING(500),
                    allowNull: true
                },
                mobile_no: {
                    type: DataTypes.STRING(20),
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
                tableName: 'product_inquiry',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {
        ProductInquiry.belongsTo(Product, { foreignKey: "product_id", as: 'Product' });
    }
}

export default ProductInquiry;