const { User, Address, Order, OrderProduct, Product } = require('../models');
const { errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    async count (args, context) {
        try {
            isAuthenticated(context);
            const { status } = args, { userId, userType } = context;

            let where = { clientId: userId };
            if (userType === 'commercial') where = { providerId: userId };
            if (status) where.status = status;

            const { count } = await Order.findAndCountAll({ where });
            return count;

        } catch (error) {
            return errorResponse(error);
        }
    },

    async index (args, context) {
        try {
            isAuthenticated(context);
            const { page = 1, status } = args, { userId, userType } = context;

            let where = { ClientId: userId };
            let include = [
                {
                    model: User,
                    as: "provider",
                    include: [
                        {
                            model: Address,
                            as: 'address'
                        }
                    ]
                },
                {
                    model: OrderProduct,
                    as: 'orderProduct',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            paranoid: false
                        }
                    ]
                }
            ]
            if (userType === 'commercial') {
                where = { providerId: userId };
                include[0].as = "client";
            }
            if (status) where.status = status;

            return await Order.findAll({
                where,
                order: [['createdAt', 'DESC']],
                include,
                offset: (page - 1) * 15,
                limit: 15
            });

            //console.log("All users:", JSON.stringify(query, null, 2));

        } catch (error) {
            return errorResponse(error);
        }
    },

    async show (args, context) {
        try {
            isAuthenticated(context);
            const { id } = args, { userId, userType } = context;

            let where = { id };
            let include = [
                {
                    model: User,
                    as: "provider",
                    include: [
                        {
                            model: Address,
                            as: 'address'
                        }
                    ]
                },
                {
                    model: OrderProduct,
                    as: 'orderProduct',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            paranoid: false
                        }
                    ]
                }
            ]
            if (userType === 'commercial') {
                where = { providerId: userId };
                include[0].as = "client";
            }

            return await Order.findOne({
                where,
                order: [['createdAt', 'DESC']],
                include
            });

            //console.log("All users:", JSON.stringify(query, null, 2));

        } catch (error) {
            return errorResponse(error);
        }
    },
}