const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required()
});