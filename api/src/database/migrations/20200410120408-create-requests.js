'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      value: {
        type: Sequelize.REAL,
        allowNull: false
      },
      cash: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      cashBack: {
        type: Sequelize.REAL,
        allowNull: false
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      observation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      delivery: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      timeWait: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      observation: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      reason: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }).then(async () => {
      const transaction = await queryInterface.sequelize.transaction();
      try{
        await queryInterface.addIndex(
          'Orders',
          {
            fields: ['clientId'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Orders',
          {
            fields: ['providerId'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Orders',
          {
            fields: ['status'],
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
    return queryInterface.dropTable('Orders');
  }
};
