module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
        name: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        photoUrl: DataTypes.STRING
    });
    Subcategory.associate = function (models) {
        Subcategory.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        })
    };

    return Subcategory;
}