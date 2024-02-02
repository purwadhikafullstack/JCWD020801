import { Model, DataTypes } from 'sequelize';

export default class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.Customer);
    Order.hasMany(models.OrderDetail);
  }
}

export const init = (sequelize) => {
  Order.init(
    {
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          'waiting_for_payment',
          'waiting_for_payment_confirmation',
          'in_process',
          'on_delivery',
          'completed',
          'canceled',
        ],
      },
      payment_method: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['manual', 'automatic'],
      },
      payment_proof: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      redeem_voucher: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
};
