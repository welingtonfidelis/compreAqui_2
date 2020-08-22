'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrayState = [
      { description: 'Acre', code: 'AC' }, { description: 'Alagoas', code: 'AL' },
      { description: 'Amapá', code: 'AP' }, { description: 'Amazonas', code: 'AM' },
      { description: 'Bahia', code: 'BA' }, { description: 'Ceará', code: 'CE' },
      { description: 'Espírito Santo', code: 'ES' }, { description: 'Goiás', code: 'GO' },
      { description: 'Maranhão', code: 'MA' }, { description: 'Mato Grosso', code: 'MT' },
      { description: 'Mato Grosso do Sul', code: 'MS' }, { description: 'Minas Gerais', code: 'MG' },
      { description: 'Pará', code: 'PA' }, { description: 'Paraíba', code: 'PB' },
      { description: 'Paraná', code: 'PR' }, { description: 'Pernambuco', code: 'PE' },
      { description: 'Piauí', code: 'PI' }, { description: 'Rio de Janeiro', code: 'RJ' },
      { description: 'Rio Grande do Norte', code: 'RN' }, { description: 'Rio Grande do Sul', code: 'RS' },
      { description: 'Rondônia', code: 'RO' }, { description: 'Roraima', code: 'RR' },
      { description: 'Santa Catarina', code: 'SC' }, { description: 'São Paulo', code: 'SP' },
      { description: 'Sergipe', code: 'SE' }, { description: 'Tocantins', code: 'TO' },
      { description: 'Distrito Federal', code: 'DF' }
    ]

    arrayState.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('States', arrayState, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('States', null, {});
  }
};
