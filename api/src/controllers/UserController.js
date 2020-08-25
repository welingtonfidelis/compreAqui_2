const { User, Address, Category, sequelize } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');
const bcrypt = require('bcrypt');
const BCRYPT_SALTS = parseInt(process.env.BCRYPT_SALTS) || 10;

module.exports = {
    // =====================>>  QUERY  <<===================== //
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

    // =====================>>  MUTATION  <<===================== //
    async store (args) {
        const transaction = await sequelize.transaction();

        try {
            const {
                name, doc, email, phone1, phone2, user, birth, type,
                cep, state, city, district, street, complement, number,
            } = args;

            // const AddressId = query.dataValues.id;
            const password = bcrypt.hashSync(args.password, BCRYPT_SALTS);

            const query = await User.create({
                name, doc, email, phone1, phone2,
                user, birth, password, type
            });

            await Address.create({
                ...args, userId: query.id
            });

            await transaction.commit();
            return query.id;

        } catch (error) {
            await transaction.rollback();
            return errorResponse(error);
        }
    },
    // userUpdate: async (_, args) => {
    //     const notAuthenticated = isAuthenticated(args);
    //     if (notAuthenticated) return notAuthenticated;

    //     let query = null;
    //     try {
    //         const {
    //             id, name, doc, email, phone1, phone2, user, birth, password, type,
    //             AddressId, cep, state, city, district, street, complemen, number,
    //         } = args;

    //         query = await Address.update({
    //             cep, state, city, district,
    //             street, complemen, number,
    //         },
    //             {
    //                 return: true,
    //                 where: {
    //                     id: AddressId
    //                 }
    //             }
    //         );

    //         query = await User.update({
    //             name, doc, email, phone1, phone2,
    //             user, birth, password, type, AddressId
    //         },
    //             {
    //                 return: true,
    //                 where: {
    //                     id
    //                 }
    //             }
    //         );

    //         query = query[0];

    //     } catch (error) {
    //         const err = error.stack || error.errors || error.message || error;
    //         console.warn(err);
    //     }
    //     return query;
    // },
    // userDelete: async (_, args) => {
    //     const notAuthenticated = isAuthenticated(args);
    //     if (notAuthenticated) return notAuthenticated;

    //     let query = null;
    //     try {
    //         const { id } = args;

    //         query = await User.destroy({
    //             where: {
    //                 id
    //             }
    //         });

    //     } catch (error) {
    //         const err = error.stack || error.errors || error.message || error;
    //         console.warn(err);
    //     }

    //     return query;
    // },
}