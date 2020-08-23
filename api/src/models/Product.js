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
            foreignKey: 'providerId',
            as: 'provider'
        }),
        Product.belongsTo(models.Brand, {
            foreignKey: 'brandId',
            as: 'brand'
        }),
        Product.belongsTo(models.Size, {
            foreignKey: 'sizeId',
            as: 'size'
        }),
        Product.belongsTo(models.Subcategory, {
            foreignKey: 'subcategoryId',
            as: 'subcategory'
        }),
        Product.hasMany(models.ProductPhoto, {
            foreignKey: 'productId',
            as: 'productPhoto'
        })
    };

    return Product;
}