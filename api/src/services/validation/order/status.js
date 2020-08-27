const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    status: Joi.string()
        .length(8)
        .required(),

    reason: Joi.string()
        .min(3)
        .max(255),

    timeWait: Joi.number()
        .integer()
        .min(1),
});