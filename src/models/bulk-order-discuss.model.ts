import { DataTypes, Model, Sequelize } from 'sequelize';

class BulkOrderDiscuss extends Model {
    static initModel(connection: Sequelize) {
        BulkOrderDiscuss.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize: connection,
                tableName: 'bulk_order_discuss',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}


export default BulkOrderDiscuss;