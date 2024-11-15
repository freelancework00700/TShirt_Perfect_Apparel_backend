import { DataTypes, Model, Sequelize } from 'sequelize';
import Category from './category.model';

class Size extends Model {
    static initModel(connection: Sequelize) {
        Size.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                category_id: {
                    type: DataTypes.INTEGER(),
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
                tableName: 'size',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {
        Size.belongsTo(Category, { foreignKey: "category_id", as: "Category" });
    }
}

export default Size;