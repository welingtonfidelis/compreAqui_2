const { State } = require('../models');
const { errorResponse } = require('../utils');

module.exports = {
    async index(args) {
        try {
            return await State.findAll({
                order: [['description', 'ASC']]
            });

        } catch (error) {
            return errorResponse(error);
        }
    }
}