import { Model, DataTypes } from 'sequelize';

export default class Product extends Model {
  static associate(models) {
    Product.hasMany(models.ProductImage);
    Product.belongsTo(models.Category);
    Product.hasMany(models.ProductBranch);
    Product.hasMany(models.OrderDetail);
  }
}

export const init = (sequelize) => {
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
};
