import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
  static associate(models) {
    City.belongsTo(models.Province, { foreignKey: 'province_id' });
    City.hasMany(models.CustomerAddress, { foreignKey: 'CityId' });
    City.hasMany(models.Branch, { foreignKey: 'CityId' });
  }
}

export const init = (sequelize) => {
  City.init(
    {
      city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Province',
        //   key: 'province_id',
        // },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'City',
      timestamps: false,
    }
  );
}