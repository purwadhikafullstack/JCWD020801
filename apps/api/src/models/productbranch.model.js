import { Model, DataTypes } from 'sequelize';

export default class ProductBranch extends Model {
  static associate(models) {
    ProductBranch.belongsTo(models.Product);
    ProductBranch.belongsTo(models.Branch);
    ProductBranch.hasMany(models.Discount);
    ProductBranch.hasMany(models.StockHistory)
  }
}

export const init = (sequelize) => {
  ProductBranch.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductBranch',
    },
  );
};
