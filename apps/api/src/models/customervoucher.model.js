import { Model, DataTypes } from 'sequelize';

export default class CustomerVoucher extends Model {
  static associate(models) {
    CustomerVoucher.belongsTo(models.Customer);
    CustomerVoucher.belongsTo(models.Voucher);
  }
}

export const init = (sequelize) => {
  CustomerVoucher.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CustomerVoucher',
    },
  );
};
