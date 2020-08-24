const { Category } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    async index () {
        try {
            return await Category.findAll({
                order: [['name', 'ASC']]
            });

        } catch (error) {
            return errorResponse(error);
        }
    },
}