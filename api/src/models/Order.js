module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        clientId: DataTypes.INTEGER,
        providerId: DataTypes.INTEGER,
        timeWait: DataTypes.INTEGER,
        value: DataTypes.REAL,
        status: DataTypes.STRING,
        delivery: DataTypes.BOOLEAN,
        cash: DataTypes.BOOLEAN,
        cashBack: DataTypes.REAL,
        observation: DataTypes.STRING,
        reason: DataTypes.STRING
    },
        {
            tableName: 'Orders',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            foreignKey: 'providerId',
            as: 'provider'
        }),
        Order.belongsTo(models.User, {
            foreignKey: 'clientId',
            as: 'client'
        }),
        Order.hasMany(models.OrderProduct, {
            foreignKey: 'orderId',
            as: 'orderProduct'
        })
    };

    return Order;
}