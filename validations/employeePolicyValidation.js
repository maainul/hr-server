import Joi from 'joi'

export const validateEmployeePolicy = (data) => {
   const employeePolicySchema = Joi.object({
      employee: Joi.string().required().messages({
         'string.base': 'Employee ID should be a type of text',
         'string.empty': 'Employee ID cannot be empty',
         'any.required': 'Employee ID is required'
      }),
      policy: Joi.string().required().messages({
         'string.base': 'Policy ID should be a type of text',
         'string.empty': 'Policy ID code cannot be empty',
         'any.required': 'Policy ID code is required'
      }),
   })

   const options = { abortEarly: false, allowUnknown: false };
   return employeePolicySchema.validate(data, options);
}
