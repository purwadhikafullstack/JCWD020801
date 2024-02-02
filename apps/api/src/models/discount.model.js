import { Model, DataTypes } from 'sequelize';

export default class Discount extends Model {
  static associate(models) {
    Discount.belongsTo(models.ProductBranch);
  }
}

export const init = (sequelize) => {
  Discount.init(
    {
      value: {
        type: DataTypes.ENUM,
        values: ['percentage', 'nominal'],
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      min_purchase_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Discount',
    },
  );
};
