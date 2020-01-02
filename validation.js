// import Joi (validation packet)
const Joi = require('@hapi/joi');

// post validation
const addSnusValidation = data => {
    const schema = Joi.object({
        brand: Joi.string() 
                .required()
                .max(255)
                .min(2),
        product: Joi.string()
                .required()
                .max(255)
                .min(2),
        snusType: Joi.string()
                .allow('')
                .max(255),
        nicotineAmount: Joi.string()
                .allow('')
                .max(255),
        amountPerBox: Joi.string()
                .allow('')
                .max(255),
        producer: Joi.string()
                .allow('')
                .max(255),
        misc: Joi.string()
                .allow('')
                .max(255),
        status: Joi.number()
                .min(1)
    });
    return schema.validate(data);
};

// login validation
const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
                    .required()
                    .min(3),
        password: Joi.string()
                    .min(3)
                    .required()
    });
    return schema.validate(data);
}

module.exports.addSnusValidation = addSnusValidation;
module.exports.loginValidation = loginValidation;