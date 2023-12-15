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
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Branch',
    },
  );
};
