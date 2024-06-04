import Joi from 'joi';

export const validateUser = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required'
        }),
        password: Joi.string().required().messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        }),
        passwordVerify: Joi.string().required().messages({
            'string.base': 'Password verification should be a type of text',
            'string.empty': 'Password verification cannot be empty',
            'any.required': 'Password verification is required'
        }),
        group: Joi.string().optional().messages({
            'string.base': 'Group should be a type of text',
        })
    });

    const options = { abortEarly: false, allowUnknown: false };
    return userSchema.validate(data, options);
}
