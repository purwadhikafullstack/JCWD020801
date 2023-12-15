import { Model, DataTypes } from 'sequelize';

export default class CustomerAddress extends Model {
  static associate(models) {
    CustomerAddress.belongsTo(models.Customer);
  }
}

export const init = (sequelize) => {
  CustomerAddress.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL,
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
