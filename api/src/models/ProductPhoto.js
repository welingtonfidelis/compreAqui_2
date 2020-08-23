module.exports = (sequelize, DataTypes) => {
    const ProductPhoto = sequelize.define('ProductPhoto', {
        productId: DataTypes.INTEGER,
        photoUrl: DataTypes.STRING
    });
    ProductPhoto.associate = function (models) {
        ProductPhoto.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        })
    };

    return ProductPhoto;
}