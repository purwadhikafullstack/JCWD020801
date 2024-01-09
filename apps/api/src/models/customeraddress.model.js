import { Model, DataTypes } from 'sequelize';

export default class CustomerAddress extends Model {
  static associate(models) {
    CustomerAddress.belongsTo(models.Customer);
  }
}

export const init = (sequelize) => {
  CustomerAddress.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerAddressName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'CustomerAddress',
    },
  );
};
