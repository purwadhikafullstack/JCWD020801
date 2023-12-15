import { Model, DataTypes } from 'sequelize';

export default class Category extends Model {
  static associate(models) {
    Category.hasMany(models.SubCategory);
    Category.hasMany(models.Product);
  }
}

export const init = (sequelize) => {
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
};
