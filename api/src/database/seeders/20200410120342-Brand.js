'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = [];
    for (let i = 1; i <= 20; i++) {
      brands.push(
        {
          name: `Marca ${i}`,
          providerId: i,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
    }

    return queryInterface.bulkInsert({ tableName: 'Brands' }, brands)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Brands' },
      [{}])
  }
};
