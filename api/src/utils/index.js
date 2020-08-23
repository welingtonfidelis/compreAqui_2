const { ApolloError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
    errorResponse(error) {
        console.warn('ERROR!!!', error);
        let code = 500;

        if (error.code) code = error.code;

        const message = code != 500
            ? error.message || "Internal server error"
            : "Internal server error";

        return new ApolloError(message, code);
    },

    createError(code, message) {
        throw { code, message }
    },

    createToken(obj, expiresIn = '12h') {
        if (!obj.userId) {
            throw {
                code: 412,
                message: "userId required"
            }
        }

        return jwt.sign(
            { ...obj }, SECRET, { expiresIn }
        );
    },

    validateToken(req) {
        const { authorization } = req.headers;
        let response = {};

        jwt.verify(authorization, SECRET, function (err, decoded) {
            if (err) return;

            Object.entries(decoded).forEach(el => {
                response[el[0]] = el[1];
            });
        });

        return response;
    },

    isAuthenticated(context) {
        if (!context.loggedIn) throw { code: 401, message: 'Not Authorized' };
        return;
    }
}