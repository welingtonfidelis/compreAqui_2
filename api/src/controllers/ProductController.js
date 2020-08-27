const { Op } = require('sequelize');
const { User, Product, ProductPhoto, Brand, Size } = require('../models');
const { errorResponse, isAuthenticated, validateInput, validateId } = require('../utils');
const productCreate = require('../services/validation/product/create');
const productUpdate = require('../services/validation/product/update');
const productDelete = require('../services/validation/product/delete');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async count(args, context) {
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

    async index(args, context) {
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

    async show(args, context) {
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
    async store(args, context) {
        try {
            isAuthenticated(context);
            validateInput(args, productCreate);

            const { userId } = context;
            const { id } = await Product.create({
                ...args, providerId: userId
            });

            return id;

        } catch (error) {
            return errorResponse(error);
        }
    },
    async update(args, context) {
        try {
            isAuthenticated(context);
            validateInput(args, productUpdate);

            const { id } = args;
            await validateId(id, `"Products"`);

            const [query] = await Product.update(
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
    async delete(args, context) {
        try {
            isAuthenticated(context);
            validateInput(args, productDelete);

            const { id } = args;
            await validateId(id, `"Products"`);

            const query = await Product.destroy({
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