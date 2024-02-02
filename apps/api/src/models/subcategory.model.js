import { Model, DataTypes } from 'sequelize';

export default class SubCategory extends Model {
  static associate(models) {
    SubCategory.belongsTo(models.Category);
    SubCategory.hasMany(models.Product);
  }
}

export const init = (sequelize) => {
  SubCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SubCategory',
    },
  );
};
