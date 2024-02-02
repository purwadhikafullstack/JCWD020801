import { Model, DataTypes } from 'sequelize';

export default class ProductImage extends Model {
  static associate(models) {
    ProductImage.belongsTo(models.Product);
  }
}

export const init = (sequelize) => {
  ProductImage.init(
    {
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ProductImage',
    },
  );
};
