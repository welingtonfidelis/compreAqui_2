const Upload = require('../services/Upload');
const { errorResponse, createToken, createError, isAuthenticated } = require('../utils');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const {
    User, Category, Address, State, Brand
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
                const { providerId } = args;

                const { count } = await Brand.findAndCountAll({
                    where: { providerId }
                });

                return count;

            } catch (error) {
                return errorResponse(error);
            }
        },

        brandIndex: async (_, args, context) => {
            try {
                isAuthenticated(context);
                const { page = 1, providerId } = args;

                return await Brand.findAll({
                    where: {
                        providerId
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