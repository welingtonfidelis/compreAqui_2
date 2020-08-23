module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        price: DataTypes.REAL
    },
        {
            tableName: 'OrderProducts',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    OrderProduct.associate = function (models) {
        OrderProduct.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        }),
        OrderProduct.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        })
    };

    return OrderProduct;
}