const { Size } = require('../models');
const { errorResponse, isAuthenticated, validateInput, validateId } = require('../utils');
const sizeCreate = require('../services/validation/size/create');
const sizeUpdate = require('../services/validation/size/update');
const sizeDelete = require('../services/validation/size/delete');

module.exports = {
    // =====================>>  QUERY  <<===================== //
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

    // =====================>>  MUTATION  <<===================== //
    store: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, sizeCreate);

            const { name } = args, { userId } = context;

            const { id } = await Size.create({
                providerId: userId, name
            });

            return id;

        } catch (error) {
            return errorResponse(error);
        }
    },
    update: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, sizeUpdate);

            const { id } = args, { userId } = context;
            await validateId(id, `"Sizes"`);

            const [query] = await Size.update(
                { ...args },
                {
                    return: true,
                    where: {
                        id,
                        providerId: userId
                    }
                }
            );

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },
    delete: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, sizeDelete);

            const { id } = args, { userId } = context;
            await validateId(id, `"Sizes"`);

            const query = await Size.destroy({
                where: {
                    id,
                    providerId: userId
                }
            });

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },
}