const { Subcategory, User } = require('../models');
const {  errorResponse, isAuthenticated } = require('../utils');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async index () {
        try {
            return await Subcategory.findAll({
                order: [['name', 'ASC']]
            });

        } catch (error) {
            return errorResponse(error);
        }
    },

    async indexByUser (args, context) {
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

    // =====================>>  MUTATION  <<===================== //
}