import Joi from 'joi'

export const validateDepartment = (data) => {
   const departmentSchema = Joi.object({
      full_name: Joi.string().required().messages({
         'string.base': 'Full name should be a type of text',
         'string.empty': 'Full name cannot be empty',
         'any.required': 'Full name is required'
      }),
      email: Joi.string().required().messages({
         'string.base': 'Email code should be a type of text',
         'string.empty': 'Email code cannot be empty',
         'any.required': 'Email code is required'
      }),
      permanent_address: Joi.string().required().messages({
         'string.base': 'Permanent Address should be a type of text',
         'string.empty': 'Permanent Addresscode cannot be empty',
         'any.required': 'Permanent Address code is required'
      }),
      present_address: Joi.string().required().messages({
         'string.base': 'Present Address should be a type of text',
         'string.empty': 'Present Addresscode cannot be empty',
         'any.required': 'Present Address code is required'
      }),
      date_of_joining: Joi.date().required().messages({
         'string.base': 'joining date should be a type of date',
         'date.empty': 'joining date cannot be empty',
         'any.required': 'joining date code is required'
      }),
      date_of_birth: Joi.date().required().messages({
         'string.base': 'Birth date should be a type of date',
         'date.empty': 'Birth date cannot be empty',
         'any.required': 'Birth date code is required'
      }),
      emergency_contact_name: Joi.string().required().messages({
         'string.base': 'Emergency Contact Name should be a type of text',
      }),
      emergency_contact_number_1: Joi.string().required().messages({
         'string.base': 'Emergency Contact should be a type of text',
         'string.empty': 'Emergency Contact date cannot be empty',
         'any.required': 'Emergency Contact code is required'
      }),
      national_id: Joi.number().required().messages({
         'number.base': 'Emergency Contact should be a type of text',
         'number.empty': 'Emergency Contact date cannot be empty',
         'any.required': 'Emergency Contact code is required'
      }),
      gender: Joi.string().required().messages({
         'string.base': 'Gender should be a type of text',
         'string.empty': 'Gender date cannot be empty',
         'any.required': 'Gender is required'
      }),
      marital_status: Joi.string().required().messages({
         'string.base': 'Marital Status should be a type of text',
         'string.empty': 'Marital Status cannot be empty',
         'any.required': 'Marital Status is required'
      }),

      status: Joi.number()

   })

   const options = { abortEarly: false, allowUnknown: false };
   return departmentSchema.validate(data, options);
}
