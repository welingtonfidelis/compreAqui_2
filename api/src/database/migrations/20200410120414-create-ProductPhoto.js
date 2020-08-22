'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        }
      },
      photoUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }).then(async () => {
      const transaction = await queryInterface.sequelize.transaction();
      try{
        await queryInterface.addIndex(
          'ProductPhotos',
          {
            fields: ['productId'],
            transaction,
          }
        );
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductPhotos');
  }
};
