const Upload = require('../services/Upload');
const { errorResponse, createToken, createError } = require('../utils');
const { User, State } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
    //========// QUERY //========//
    Query: {
        test: () => {
            return 'Hello World!';
        },

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

                const token = createToken({ userId, userType });
                return {
                    name, token, photoUrl, userType
                };

            } catch (error) {
                return errorResponse(error);
            }
        },

        stateIndex: async () => {
            let query = null;
            try {
                query = await State.findAll({
                    order: [['description', 'ASC']]
                });

            } catch (error) {
                const err = error.stack || error.errors || error.message || error;
                console.warn(err);
            }

            return query;
        }
    },

    //========// MUTATION //========//
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