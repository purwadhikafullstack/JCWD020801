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
        values: ['product', 'shipping'],
      },
      value: {
        type: DataTypes.DECIMAL,
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
