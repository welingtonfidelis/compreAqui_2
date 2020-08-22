module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
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
            tableName: 'Requests',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    Request.associate = function (models) {
        Request.belongsTo(models.User, {
            foreingKey: 'ProviderId',
            as: 'Provider'
        }),
        Request.belongsTo(models.User, {
            foreingKey: 'clientId',
            as: 'Client'
        }),
        Request.hasMany(models.RequestProduct, {
            foreingKey: 'orderId'
        })
    };

    return Request;
}