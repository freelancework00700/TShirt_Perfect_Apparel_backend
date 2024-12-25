import { DataTypes, Model, Sequelize } from 'sequelize';
import Size from './size.model';

class SizeChart extends Model {
    static initModel(connection: Sequelize) {
        SizeChart.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                size_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: false,
                },
                product_id: {
                    type: DataTypes.INTEGER(),
                    allowNull: true
                },
                chest: {
                    type: DataTypes.STRING(250),
                    allowNull: true
                },
                length_inch: {
                    type: DataTypes.STRING(250),
                    allowNull: true
                },
                shoulder: {
                    type: DataTypes.STRING(250),
                    allowNull: true
                },
                sleeve: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                waist: {
                    type: DataTypes.STRING(250),
                    allowNull: true
                },
                length_cm: {
                    type: DataTypes.STRING(250),
                    allowNull: true
                },
                hip: {
                    type: DataTypes.STRING(250),
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
                tableName: 'size_chart',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {
        SizeChart.belongsTo(Size, { foreignKey: 'size_id', targetKey: 'id' });
    }
}

export default SizeChart;