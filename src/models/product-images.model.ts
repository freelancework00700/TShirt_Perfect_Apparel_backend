import { DataTypes, Model, Sequelize } from 'sequelize';

class ProductImages extends Model {
    static initModel(connection: Sequelize) {
        ProductImages.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                product_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                },
                fileName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                fileType: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                contentType: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                fileSize: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                sysFileName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                sequelize: connection,
                tableName: 'product_images',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}

export default ProductImages;