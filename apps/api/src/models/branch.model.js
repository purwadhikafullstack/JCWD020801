import { Model, DataTypes } from 'sequelize';

export default class Branch extends Model {
  static associate(models) {
    Branch.belongsTo(models.Admin);
    Branch.hasMany(models.ProductBranch);
    Branch.belongsTo(models.City, { foreignKey: 'CityId' })
  }
}

export const init = (sequelize) => {
  Branch.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isSuperStore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      fullAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      maxDeliveryDistance: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Branch',
    },
  );
};
