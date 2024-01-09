import { Model, DataTypes } from 'sequelize';

export default class Admin extends Model {
    static associate(models) {
        Admin.hasMany(models.Branch);
    }
}

export const init = (sequelize) => {
    Admin.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            verification_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profile_picture: {
                type: DataTypes.STRING,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isSuperAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Admin',
        },
    );
};