'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sizes = [];
    for (let i = 1; i <= 20; i++) {
      sizes.push(
        {
          name: `Tamanho ${i}`,
          providerId: i,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
    }
    return queryInterface.bulkInsert({ tableName: 'Sizes' }, sizes)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Sizes' },
      [{}])
  }
};
