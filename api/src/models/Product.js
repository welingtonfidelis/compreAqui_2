module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        providerId: DataTypes.INTEGER,
        brandId: DataTypes.INTEGER,
        sizeId: DataTypes.INTEGER,
        subcategoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.REAL,
        stock: DataTypes.INTEGER,
    },
        {
            tableName: 'Products',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    Product.associate = function (models) {
        Product.belongsTo(models.User, {
            foreingKey: 'ProviderId',
            as: 'Provider'
        }),
        Product.belongsTo(models.Brand, {
            foreingKey: 'brandId',
        }),
        Product.belongsTo(models.Size, {
            foreingKey: 'sizeId',
        }),
        Product.belongsTo(models.Subcategory, {
            foreingKey: 'subcategoryId',
        }),
        Product.hasMany(models.ProductPhoto, {
            foreingKey: 'productId'
        })
    };

    return Product;
}