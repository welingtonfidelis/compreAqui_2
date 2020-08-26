const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    name: Joi.string()
        .min(1)
        .max(255)
        .required()
});