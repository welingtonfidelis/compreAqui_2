module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
        providerId: DataTypes.INTEGER,
        sizeDescription: DataTypes.STRING,
    },
        {
            tableName: 'Sizes',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    Size.associate = function (models) {
        Size.belongsTo(models.User, {
            foreignKey: 'providerId',
            as: "provider"
        })
    };

    return Size;
}