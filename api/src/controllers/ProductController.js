const { Op } = require('sequelize');
const { User, Product, ProductPhoto, Brand, Size } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async count (args, context) {
        try {
            isAuthenticated(context);
            const { providerId } = args, { userType, userId } = context;

            let where = { providerId, stock: { [Op.gt]: 0 } };
            if (userType === 'commercial') where = { providerId: userId };

            const { count } = await Product.findAndCountAll({ where });
            return count;

        } catch (error) {
            return errorResponse(error);
        }
    },

    async index (args, context) {
        try {
            isAuthenticated(context);
            const { providerId, page = 1 } = args, { userType, userId } = context;

            let where = { providerId, stock: { [Op.gt]: 0 } };
            if (userType === 'commercial') where = { providerId: userId };

            return await Product.findAll({
                where,
                order: [['name', 'ASC']],
                include: [
                    {
                        model: User,
                        as: "provider"
                    },
                    {
                        model: ProductPhoto,
                        as: 'productPhoto'
                    }
                ],
                offset: (page - 1) * 15,
                limit: 15
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    async show (args, context) {
        try {
            isAuthenticated(context);
            const { id } = args;

            return await Product.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: User,
                        as: "provider"
                    },
                    {
                        model: ProductPhoto,
                        as: 'productPhoto'
                    },
                    {
                        model: Brand,
                        as: 'brand'
                    },
                    {
                        model: Size,
                        as: 'size'
                    }
                ]

            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    // =====================>>  MUTATION  <<===================== //
}