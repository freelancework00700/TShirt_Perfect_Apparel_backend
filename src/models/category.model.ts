import { DataTypes, Model, Sequelize } from 'sequelize';

class Category extends Model {
    static initModel(connection: Sequelize) {
        Category.init(
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
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                sequelize: connection,
                tableName: 'category',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}


export default Category;