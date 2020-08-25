const { State } = require('../models');
const { errorResponse } = require('../utils');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async index(args) {
        try {
            return await State.findAll({
                order: [['description', 'ASC']]
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    // =====================>>  MUTATION  <<===================== //
}