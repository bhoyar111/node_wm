import Joi from '@hapi/joi';

const loginSchema = Joi.object({
    email_id: Joi.string().required().messages({
        'string.base': `username should be a type of 'text'`,
        'string.username': `username should be a valid username address`,
        'string.empty': `username cannot be an empty field`,
        'any.required': `username is a required field`,
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': `password should be a type of 'text'`,
        'string.empty': `password cannot be an empty field`,
        'any.required': `password is a required field`
    }),
});

export default loginSchema;