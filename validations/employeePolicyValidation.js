import Joi from 'joi'

export const validateDepartment = (data) =>{
    const employeePolicySchema = Joi.object({
         employee:Joi.string().required().messages({
            'string.base': 'Department name should be a type of text',
            'string.empty': 'Department name cannot be empty',
            'any.required': 'Department name is required'
         }),
         policy:Joi.string().required().messages({
            'string.base': 'Department code should be a type of text',
            'string.empty': 'Department code cannot be empty',
            'any.required': 'Department code is required'
         }),
    })

    const options = { abortEarly: false, allowUnknown: false };
    return employeePolicySchema.validate(data, options);
}