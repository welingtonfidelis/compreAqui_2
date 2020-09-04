const { User, Address, Order, OrderProduct, Product } = require('../models');
const { errorResponse, isAuthenticated, validateInput, validateId } = require('../utils');
const pushNotifie = require('../services/PushNotifie');
const emailNotifie = require('../services/EmailNotifie');
const orderCreate = require('../services/validation/order/create');
const orderStatus = require('../services/validation/order/status');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async count(args, context) {
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

    async index(args, context) {
        try {
            isAuthenticated(context);
            const { page = 1, status } = args, { userId, userType } = context;

            let where = { clientId: userId };
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
                    as: 'orderProducts',
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

    async show(args, context) {
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
                    as: 'orderProducts',
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

    // =====================>>  MUTATION  <<===================== //
    store: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, orderCreate);

            const { products } = args, { userId } = context;

            const { id } = await Order.create({
                ...args, timeWait: 0, status: 'awaiting', clientId: userId
            });

            for (const prod of products) {
                await OrderProduct.create({
                    orderId: id, productId: prod.id,
                    amount: prod.amount, price: prod.price
                });
            }

            const provider = await User.findOne({
                where: { id: args.providerId },
                attributes: [
                    "name", "email", "playId", "notifiePush", "notifieEmail"
                ]
            });

            if (provider) {
                const { name, email, playId, notifiePush, notifieEmail } = provider;

                const title = 'Boas notícias 😄';

                if (email && notifieEmail) {
                    const msg =
                        `
                        Olá <strong>${name}</strong>.</br>
                        Há um novo pedido em sua loja aguardando sua aprovação 
                        (pedido <strong>${id}</strong>).</br>
                        Entre na plataforma web <a href="#">clicando aqui</a> ou no 
                        seu aplicativo para obter mais informações.
                        
                        <p>
                        Boas vendas 💸</br>
                        Atenciosamente, equipe CompreAqui.</br></br>
                        <img 
                            src="https://compreaqui.s3-sa-east-1.amazonaws.com/images/important/logo.png" 
                            style="width: 120px;" 
                        />
                    `;

                    emailNotifie.sendOneEmail([email], title, msg);
                }

                if (playId, notifiePush) {
                    const msg =
                        `Olá ${name}. \n` +
                        `Há um novo pedido em sua loja (pedido ${id}).\n` +
                        `Acesse a plataforma web ou seu app para mais detalhes.`;

                    pushNotifie.sendOnePush([playId], title, msg);
                }
            }

            return id;

        } catch (error) {
            return errorResponse(error);
        }
    },
    async status(args, context) {
        try {
            isAuthenticated(context);
            validateInput(args, orderStatus);

            const { id } = args;
            await validateId(id, `"Orders"`);

            const [query] = await Order.update(
                { ...args },
                {
                    return: true,
                    where: {
                        id
                    }
                }
            );

            const order = await this.show({ id }, context);

            const { orderProducts, client } = order;

            if (args.status === 'approved') {
                for (const item of orderProducts) {
                    const stock = item.product.stock - item.amount;

                    Product.update(
                        { stock },
                        {
                            where: {
                                id: item.productId
                            }
                        }
                    );
                }
            }

            const { name, email, playId, notifiePush, notifieEmail } = client;
            const statusNof = statusNotfie(args.status);

            const title = args.status === 'approved' ? 'Boas notícias 😄' : 'Más notíficas 😟';

            if (email && notifieEmail) {
                const msg =
                    `
                        Olá <strong>${name}</strong>.</br>
                        Seu pedido (nº <strong>${id}</strong>) foi alterado para ${statusNof}.
                        </br>
                        Entre na plataforma web <a href="#">clicando aqui</a> ou no 
                        seu aplicativo para obter mais informações.
                        
                        <p>
                        Boas compras 🛍️</br>
                        Atenciosamente, equipe CompreAqui.</br></br>
                        <img 
                            src="https://compreaqui.s3-sa-east-1.amazonaws.com/images/important/logo.png" 
                            style="width: 120px;" 
                        />
                    `;

                emailNotifie.sendOneEmail([email], title, msg);
            }

            if (playId, notifiePush) {
                const msg =
                    `Olá ${name}. \n` +
                    `Seu pedido nº ${id} foi alterado para ${statusNof}.\n` +
                    `Acesse a plataforma web ou seu app para mais detalhes.`;

                pushNotifie.sendOnePush([playId], title, msg);
            }

            return query ? true : false;

        } catch (error) {
            return errorResponse(error);
        }
    },
}

const statusNotfie = (status) => {
    const st = {
        "awaiting" : "aguardando",
        "approved": "aprovado",
        "rejected": "recusado"
    }

    return st[status];
}