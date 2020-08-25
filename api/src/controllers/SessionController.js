const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createError, createToken, errorResponse } = require('../utils');

module.exports = {
    // =====================>>  QUERY  <<===================== //
    async login(args) {
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

    // =====================>>  MUTATION  <<===================== //
}