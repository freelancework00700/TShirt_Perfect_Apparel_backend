import { DataTypes, Model, Sequelize } from 'sequelize';

class GetInTouch extends Model {
    static initModel(connection: Sequelize) {
        GetInTouch.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize: connection,
                tableName: 'get_in_touch',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}


export default GetInTouch;