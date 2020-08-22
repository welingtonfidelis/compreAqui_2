'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orders = [];
    for(let i = 1; i <= 15; i++){
      orders.push(
        {
          clientId: (Math.floor(Math.random() * 5)) +21,
          providerId: (Math.floor(Math.random() * 20)) +1,
          value: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
          status: "pending",
          delivery: true,
          cash: true,
          cashBack: Math.floor(Math.random() * 100),
          observation: "Entregar no 250B",
          timeWait: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      )
    }
    return queryInterface.bulkInsert({ tableName: 'Orders' }, orders)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Orders' },
      [{}])
  }
};
