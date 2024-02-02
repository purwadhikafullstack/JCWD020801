import { Model, DataTypes } from 'sequelize';

export default class OrderDetail extends Model {
  static associate(models) {
    OrderDetail.belongsTo(models.Order);
    OrderDetail.belongsTo(models.Product);
  }
}

export const init = (sequelize) => {
  OrderDetail.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderDetail',
    },
  );
};
