'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      doc: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      phone1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birth: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photoUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      notifiePush: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      notifieEmail: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      tokenReset: {
        allowNull: true,
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      playId: {
        type: Sequelize.STRING,
        allowNull: true
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
          'Users',
          {
            fields: ['user'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Users',
          {
            fields: ['doc'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Users',
          {
            fields: ['email'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Users',
          {
            fields: ['tokenReset'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Users',
          {
            fields: ['categoryId'],
            transaction,
          }
        );
        await queryInterface.addIndex(
          'Users',
          {
            fields: ['type'],
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
    return queryInterface.dropTable('Users');
  }
};
