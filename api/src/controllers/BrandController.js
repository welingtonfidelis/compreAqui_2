const { Brand } = require('../models');
const { errorResponse, isAuthenticated, validateInput, validateId } = require('../utils');
const brandCreate = require('../services/validation/brand/create');
const brandUpdate = require('../services/validation/brand/update');
const brandDelete = require('../services/validation/brand/delete');

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
    store: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, brandCreate);

            const { name } = args, { userId } = context;

            const { id } = await Brand.create({
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
            validateInput(args, brandUpdate);

            const { id } = args;
            await validateId(id, `"Brands"`);

            const [query] = await Brand.update(
                { ...args },
                {
                    return: true,
                    where: {
                        id
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
            validateInput(args, brandDelete);

            const { id } = args;
            await validateId(id, `"Brands"`);

            const query = await Brand.destroy({
                where: {
                    id
                }
            });

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },
}