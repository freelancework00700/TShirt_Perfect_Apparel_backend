import { DataTypes, Model, Sequelize } from 'sequelize';
import Category from './category.model';

class SubCategory extends Model {
    static initModel(connection: Sequelize) {
        SubCategory.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                category_id: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                sequelize: connection,
                tableName: 'sub_category',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {
        SubCategory.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id', as: 'Category' });
    }
}


export default SubCategory;