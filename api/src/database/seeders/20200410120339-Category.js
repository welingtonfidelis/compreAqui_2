'use strict';

const categoryList = [
  {title: 'Alimentação', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/food.png'}, 
  {title: 'Aluguel', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/rent.png'}, 
  {title: 'Construção', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/crane-truck.png'},
  {title: 'Mercado', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/market.png'}, 
  {title: 'Assist.  Técnica', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/technical-support.png'}, 
  {title: 'Mecânico', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/mechanic.png'},
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [];
    for (let el of categoryList) {
      categories.push(
        {
          name: el.title,
          photoUrl: el.url,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
    }
    return queryInterface.bulkInsert({ tableName: 'Categories' }, categories)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Categories' },
      [{}])
  }
};
