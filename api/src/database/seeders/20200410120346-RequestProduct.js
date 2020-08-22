'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderProducts = [];
    for(let i = 1; i <= 15; i++) {
      orderProducts.push(
        {
          orderId: (Math.floor(Math.random() * 15)) +1,
          productId: (Math.floor(Math.random() * 50)) +1,
          amount: Math.floor(Math.random() * 10),
          price: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
    }
    return queryInterface.bulkInsert({ tableName: 'OrderProducts' }, orderProducts)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'OrderProducts' },
      [{}])
  }
};
