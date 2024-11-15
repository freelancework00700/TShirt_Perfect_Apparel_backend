import { DataTypes, Model, Sequelize } from 'sequelize';

class Color extends Model {
    static initModel(connection: Sequelize) {
        Color.init(
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
                tableName: 'color',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}

export default Color;