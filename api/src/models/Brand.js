module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        providerId: DataTypes.INTEGER,
        name: DataTypes.STRING
    },
        {
            tableName: 'Brands',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    Brand.associate = function (models) {
        Brand.belongsTo(models.User, {
            foreignKey: 'providerId',
            as: "provider"
        })
    }

    return Brand;
}