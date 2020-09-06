const { User, Address, Category, sequelize } = require('../models');
const Upload = require('../services/Upload');
const { errorResponse, isAuthenticated, validateInput, validateId } = require('../utils');
const bcrypt = require('bcrypt');
const userCreate = require('../services/validation/user/create');
const userUpdate = require('../services/validation/user/update');
const userDelete = require('../services/validation/user/delete');
const BCRYPT_SALTS = parseInt(process.env.BCRYPT_SALTS) || 10;

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async index(args, context) {
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

    async indexByCategory(args, context) {
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

    async show(args, context) {
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

    async showByDoc(args) {
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

    async showByEmail(args) {
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

    async showByUser(args) {
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
    async store(args) {
        const transaction = await sequelize.transaction();

        try {
            validateInput(args, userCreate);

            let photoUrl = null;
            if(args.photo && args.photo !== '') {
                const folder = args.type === 'client' ? 'client' : 'commercial';
                const resp = await Upload.uploadImage(args.photo, folder, args.name);
                
                if(resp) photoUrl = resp.Location;
            }

            const password = bcrypt.hashSync(args.password, BCRYPT_SALTS);

            const { id } = await User.create({
                ...args, password, photoUrl
            });

            await Address.create({
                ...args, userId: id
            });

            await transaction.commit();
            return id;

        } catch (error) {
            await transaction.rollback();
            return errorResponse(error);
        }
    },
    update: async (args, context) => {
        try {
            isAuthenticated(context);
            validateInput(args, userUpdate);

            const { id } = args;
            await validateId(id, `"Users"`);

            const [query] = await User.update(
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
    async delete (args, context) {
        try {
            isAuthenticated(context);
            validateInput({ ...args }, userDelete);
            
            const { id } = args;
            await validateId(id, `"Users"`);

            const query = await User.destroy({
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