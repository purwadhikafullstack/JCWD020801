import { Model, DataTypes } from 'sequelize';

export default class StockHistory extends Model {
  static associate(models) {
    StockHistory.belongsTo(models.ProductBranch);
  }
}

export const init = (sequelize) => {
  StockHistory.init(
    {
      initialStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      finalStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      difference: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'StockHistory',
    },
  );
};
