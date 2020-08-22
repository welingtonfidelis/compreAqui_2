module.exports = (sequelize, DataTypes) => {
    const RequestProduct = sequelize.define('RequestProduct', {
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        price: DataTypes.REAL
    },
        {
            tableName: 'RequestProducts',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    RequestProduct.associate = function (models) {
        RequestProduct.belongsTo(models.Request, {
            foreingKey: 'orderId',
        }),
        RequestProduct.belongsTo(models.Product, {
            foreingKey: 'productId'
        })
    };

    return RequestProduct;
}