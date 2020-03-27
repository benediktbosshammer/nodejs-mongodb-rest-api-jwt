const Joi = require('@hapi/joi');

// Register
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;