'use strict';

const subCategoryList = [
  {title: 'Lanchonete', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/fast-food.png', CategoryId: 1}, 
  {title: 'Pizzaria', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/pizza.png', CategoryId: 1}, 
  {title: 'Casa', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/construction.png', CategoryId: 2},
  {title: 'Rancho', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/horse.png', CategoryId: 2}, 
  {title: 'Materias para constr.', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/technical-support.png', CategoryId: 3}, 
  {title: 'Pedreiro', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/category/mechanic.png', CategoryId: 3},
  {title: 'Super mercado', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/supermarket.png', CategoryId: 4},
  {title: 'Mercearia', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/grocery.png', CategoryId: 4},
  {title: 'Celular', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/smartphone.png', CategoryId: 5},
  {title: 'Televisão', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/television.png', CategoryId: 5},
  {title: 'Carro', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/car.png', CategoryId: 6},
  {title: 'Moto', url: 'https://compreaqui.s3-sa-east-1.amazonaws.com/images/subCategory/scooter.png', CategoryId: 6},
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subCategories = []
    for(const el of subCategoryList) {
      subCategories.push(
        {
          name: el.title,
          photoUrl: el.url,
          categoryId: el.CategoryId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
    }
    return queryInterface.bulkInsert({ tableName: 'Subcategories' }, subCategories)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'Subcategories' },
      [{}])
  }
};
