const Upload = require('../services/Upload');
const { errorResponse, createToken, createError, isAuthenticated } = require('../utils');
const { User, Category, Address, State } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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