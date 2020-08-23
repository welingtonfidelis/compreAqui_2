const Upload = require('../services/Upload');
const { errorResponse, createToken, createError, isAuthenticated } = require('../utils');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const {
    User, Category, Address, State, Brand, Size, Subcategory,
    Product, ProductPhoto, Order, OrderProduct
} = require('../models');

const resolvers = {
    // =====================>>  QUERY  <<=====================//

    Query: {
        //===========> TESTES <============//
        test: () => {
            return 'Hello World!';
        },

        //===========> LOGIN/SESSION <============//
        sessionSign: async (_, args) => {
            try {
                const { user, password, playId } = args;

                const query = await User.findOne({
                    where: {
                        [Op.or]: [{ user }, { email: user }]
                    },
                    attributes: ['id', 'name', 'password', 'type', 'photoUrl', 'playId']
                });

                if (!query) createError(400, 'Invalid user or password');

                const {
                    id: userId, name, type: userType, photoUrl,
                    password: hash, playId: userPlayId
                } = query;

                const isValid = await bcrypt.compareSync(password, hash);

                if (!isValid) createError(400, 'Invalid user or password');

                if (playId && playId != userPlayId) {
                    User.update(
                        { playId },
                        { where: { id: userId } }
                    );
                }

                const token = createToken({ userId, userType, loggedIn: true });
                return {
                    name, token, photoUrl, userType
                };

            } catch (error) {
                return errorResponse(error);
            }
        },

        //===========> STATES <============//
        stateIndex: async () => {
            let query = null;
            try {
                query = await State.findAll({
                    order: [['description', 'ASC']]
                });

            } catch (error) {
                return errorResponse(error);
            }

            return query;
        },

        //===========> USERS <============//
        userIndex: async (_, args, context) => {
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
        userIndexByCategory: async (_, args, context) => {
            try {
                isAuthenticated(context);
                const { page = 1, CategoryId } = args;

                return await User.findAll({
                    where: {
                        CategoryId
                    },
                    order: [['name', 'ASC']],
                    include: [
                        {
                            model: Address,
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

        userShow: async (_, args, context) => {
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

        userShowByDoc: async (_, args) => {
            try {
                const { doc } = args;

                return await User.findOne({
                    where: {
                        doc
                    }
                })

            } catch (error) {
                return errorResponse(error);
            }
        },

        userShowByEmail: async (_, args) => {
            try {
                const { email } = args;

                return await User.findOne({
                    where: {
                        email
                    }
                })

            } catch (error) {
                return errorResponse(error);
            }
        },

        userShowByUser: async (_, args) => {
            try {
                const { user } = args;

                return await User.findOne({
                    where: {
                        user
                    }
                })

            } catch (error) {
                return errorResponse(error);
            }
        },

        //===========> BRANDS <============//
        brandCount: async (_, args, context) => {
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

        brandIndex: async (_, args, context) => {
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

        brandShow: async (_, args, context) => {
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

        //===========> SIZES <============//
        sizeCount: async (_, args, context) => {
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

            return count;
        },

        sizeIndex: async (_, args, context) => {
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

        sizeShow: async (_, args, context) => {
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

        //===========> CATEGORIES <============//
        categoryIndex: async () => {
            try {
                return await Category.findAll({
                    order: [['name', 'ASC']]
                });

            } catch (error) {
                return errorResponse(error);
            }
        },

        //===========> SUBCATEGORIES <============//
        subcategoryIndex: async () => {
            try {
                return await Subcategory.findAll({
                    order: [['name', 'ASC']]
                });

            } catch (error) {
                return errorResponse(error);
            }
        },

        subcategoryIndexByUser: async (_, args, context) => {
            try {
                isAuthenticated(context);
                const { userId } = context;

                const { categoryId } = await User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: ["categoryId"]
                });

                if (!categoryId) createError(412, 'Subcategories not found');

                return await Subcategory.findAll({
                    where: { categoryId },
                    order: [['name', 'ASC']]
                });

            } catch (error) {
                return errorResponse(error);
            }
        },

        //===========> PRODUCT <============//
        productCount: async (_, args, context) => {
            try {
                isAuthenticated(context);
                const { providerId } = args, { userType, userId } = context;

                let where = { providerId, stock: { [Op.gt]: 0 } };
                if (userType === 'commercial') where = { providerId: userId };

                const { count } = await Product.findAndCountAll({ where });
                query = count;

            } catch (error) {
                return errorResponse(error);
            }

            return query;
        },

        productIndex: async (_, args, context) => {
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

        productShow: async (_, args, context) => {
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

        //===========> ORDERS <============//
        orderCount: async (_, args, context) => {
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

        orderIndex: async (_, args, context) => {
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

        orderShow: async (_, args, context) => {
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
    },

    // =====================>>  MUTATION  <<=====================//

    Mutation: {
        test: (parent, args) => {
            return 'Olá ' + args.name;
        },

        singleUpload: async (parent, args) => {
            const resp = await Upload.uploadImage(args.file, 'Teste', 'testeUp');

            console.log(resp);
            return 'resp'
        },
    },
};

module.exports = resolvers;