const { Brand } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    count: async (args, context) => {
        try {
            isAuthenticated(context);
            const { userId } = context;

            const { count } = await Brand.findAndCountAll({
                where: { providerId: userId }
            });

            return count;

        } catch (error) {
            return errorResponse(error);
        }
    },

    index: async (args, context) => {
        try {
            isAuthenticated(context);
            const { page = 1 } = args, { userId } = context;

            return await Brand.findAll({
                where: {
                    providerId: userId
                },
                order: [['brandDescription', 'ASC']],
                offset: (page - 1) * 15,
                limit: 15
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    show: async (args, context) => {
        try {
            isAuthenticated(context);
            const { id } = args;

            return await Brand.findOne({
                where: { id }
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    // =====================>>  MUTATION  <<===================== //
}