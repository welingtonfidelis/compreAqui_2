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

        if (!authorization) {
            throw {
                code: 401,
                message: "Authorization is required"
            }
        }

        jwt.verify(authorization, SECRET, function (err, decoded) {
            if (err) {
                throw {
                    message: 'Invalid Authorization',
                    code: 401
                };
            }

            Object.entries(decoded).forEach(el => {
                if (el[0] === 'security') el[1] = decrypt(el[1], type);
                req.headers[el[0]] = el[1];
            });
        });
    },
}