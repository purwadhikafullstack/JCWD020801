import { Model, DataTypes } from 'sequelize';

export default class Voucher extends Model {
  static associate(models) {
    Voucher.hasMany(models.CustomerVoucher);
  }
}

export const init = (sequelize) => {
  Voucher.init(
    {
      code: {
        type: DataTypes.STRING,
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
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['product', 'shipping_cost', 'referral_code'],
      },
      value: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['percentage', 'nominal'],
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      min_purchase_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Voucher',
    },
  );
};
