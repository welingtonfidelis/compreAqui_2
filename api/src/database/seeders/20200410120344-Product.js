'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];
    for (let i = 1; i <= 50; i++) {
      products.push(
        {
          brandId: (Math.floor(Math.random() * 20)) +1,
          sizeId: (Math.floor(Math.random() * 20)) +1,
          subcategoryId: (Math.floor(Math.random() * 12)) +1,
          name: `Produto ${i}`,
          description: `Produto ${i} descrição`,
          price: Math.floor(Math.random() * (10000 - 100) + 100) / 100,
          stock: Math.floor(Math.random() * 100),
          providerId: (Math.floor(Math.random() * 20)) +1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      )
    }
    return queryInterface.bulkInsert({ tableName: 'Products' }, products)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Products' }, [{}])
  }
};
