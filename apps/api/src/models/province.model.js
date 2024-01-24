import { Model, DataTypes } from 'sequelize';

export default class Province extends Model {
  static associate(models) {
    Province.hasMany(models.City, { foreignKey: 'province_id' });
  }
}

export const init = (sequelize) => {
  Province.init(
    {
      province_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Province',
      timestamps: false,
    }
  );
}
