module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        doc: DataTypes.STRING,
        email: DataTypes.STRING,
        phone1: DataTypes.STRING,
        phone2: DataTypes.STRING,
        user: DataTypes.STRING,
        birth: DataTypes.DATE,
        password: DataTypes.STRING,
        photoUrl: DataTypes.STRING,
        tokenReset: DataTypes.STRING,
        type: DataTypes.STRING,
        addressId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        playId: DataTypes.STRING,
        notifiePush: DataTypes.BOOLEAN,
        notifieEmail: DataTypes.BOOLEAN
    },
        {
            tableName: 'Users',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        });
    User.associate = function (models) {
        User.belongsTo(models.Address, {
            foreingKey: 'addressId',
            onDelete: 'cascade'
        }),
            User.belongsTo(models.Category, {
                foreingKey: 'categoryId'
            })
    };

    return User;
}