const { User, Address, Category } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    async index (args, context) {
        try {
            isAuthenticated(context);
            const { page = 1 } = args;

            return await User.findAll({
                order: [['name', 'ASC']],
                include: [
                    {
                        model: Address,
                        as: 'address'
                    },
                    {
                        model: Category,
                        as: 'category'
                    }
                ],
                offset: (page - 1) * 15,
                limit: 15
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    async indexByCategory (args, context) {
        try {
            isAuthenticated(context);
            const { page = 1, categoryId } = args;

            return await User.findAll({
                where: {
                    categoryId
                },
                order: [['name', 'ASC']],
                include: [
                    {
                        model: Address,
                        as: 'address'
                    }
                ],
                offset: (page - 1) * 15,
                limit: 15
            });
            // console.log("All users:", JSON.stringify(query, null, 2));

        } catch (error) {
            return errorResponse(error);
        }
    },

    async show (args, context) {
        try {
            isAuthenticated(context);
            const { id } = args;

            return await User.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Address,
                        as: 'address'
                    }
                ]
            })

        } catch (error) {
            return errorResponse(error);
        }
    },

    async showByDoc (args) {
        try {
            const { doc } = args;

            const query = await User.findOne({
                where: {
                    doc
                },
                attributes: ['id']
            });

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },

    async showByEmail (args) {
        try {
            const { email } = args;

            const query = await User.findOne({
                where: {
                    email
                },
                attributes: ['id']
            });

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },

    async showByUser (args) {
        try {
            const { user } = args;

            const query = await User.findOne({
                where: {
                    user
                }
            });

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },
}