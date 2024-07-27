import Joi from 'joi'

export const validateDepartment = (data) => {
   const departmentSchema = Joi.object({
      name: Joi.string().required().messages({
         'string.base': 'Department name should be a type of text',
         'string.empty': 'Department name cannot be empty',
         'any.required': 'Department name is required'
      }),
      dptCode: Joi.string().required().messages({
         'string.base': 'Department code should be a type of text',
         'string.empty': 'Department code cannot be empty',
         'any.required': 'Department code is required'
      }),
      dptLocation:Joi.string().optional().messages({
         'string.base': 'Department code should be a type of text',
      }),
      status: Joi.number()

   })

   const options = { abortEarly: false, allowUnknown: false };
   return departmentSchema.validate(data, options);
}
