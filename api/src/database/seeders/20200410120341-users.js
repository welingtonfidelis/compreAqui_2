'use strict';

const bcrypt = require('bcrypt');
const faker = require('faker');
faker.locale = 'pt_BR';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [];
        for (let i = 1; i <= 20; i++) {
            users.push(
                {
                    name: faker.company.companyName(),
                    email: `comercial${i}@email.com`,
                    phone1: faker.phone.phoneNumber(),
                    phone2: faker.phone.phoneNumber(),
                    doc: `00.000.000/0001-${(i + '').padStart(2, 0)}`,
                    user: `comercial${i}`,
                    birth: '1990-07-28 00:00:00',
                    password: bcrypt.hashSync('1234', 10),
                    type: 'commercial',
                    categoryId: Math.floor(Math.random() * 6) + 1,
                    photoUrl: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            )
        }

        for (let i = 1; i <= 5; i++) {
            users.push(
                {
                    name: faker.name.findName(),
                    email: `user${i}@email.com`,
                    phone1: faker.phone.phoneNumber(),
                    phone2: faker.phone.phoneNumber(),
                    doc: `000.000.000-${(i + '').padStart(2, 0)}`,
                    user: `user${i}`,
                    birth: '1990-07-28 00:00:00',
                    password: bcrypt.hashSync('1234', 10),
                    type: 'client',
                    photoUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            )
        }

        return queryInterface.bulkInsert({ tableName: 'Users' }, users)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete({ tableName: 'Users' }, [{}])
    }
};
