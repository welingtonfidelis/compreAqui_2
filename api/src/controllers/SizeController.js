const { Size } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    count: async (args, context) => {
        try {
            isAuthenticated(context);
            const { userId } = context;

            const { count } = await Size.findAndCountAll({
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

            return await Size.findAll({
                where: {
                    providerId: userId
                },
                order: [['sizeDescription', 'ASC']],
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
            
            return await Size.findOne({
                where: { id },
            });

        } catch (error) {
            return errorResponse(error);
        }
    },
}