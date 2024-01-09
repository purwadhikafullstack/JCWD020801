import { Model, DataTypes } from 'sequelize';

export default class Branch extends Model {
  static associate(models) {
    Branch.belongsTo(models.Admin);
    Branch.hasMany(models.ProductBranch);
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
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      latitude: {
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
      }
    },
    {
      sequelize,
      modelName: 'Branch',
    },
  );
};
