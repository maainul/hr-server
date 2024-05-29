import Joi from 'joi'

export const validateEmployee = (data) => {
   const employeeSchema = Joi.object({
      full_name: Joi.string().required().messages({
         'string.base': 'Full name should be a type of text',
         'string.empty': 'Full name cannot be empty',
         'any.required': 'Full name is required'
      }),
      email: Joi.string().required().messages({
         'string.base': 'Email code should be a type of text',
         'string.empty': 'Email code cannot be empty',
         'string.email': 'Email must be a valid email',
         'any.required': 'Email code is required'
      }),
      phone: Joi.string().required().messages({
         'string.base': 'Phone Number should be a type of text',
         'string.empty': 'Phone Number cannot be empty',
         'any.required': 'Phone Number is required'
      }),
      emergency_contact_number_2: Joi.string().optional().messages({
        'string.base': 'Emergency contact number 2 should be a type of text',
      }),
      bank_account: Joi.string().required().messages({
         'string.base': 'Bank Account Number should be a type of text',
      }),
      bank_name: Joi.string().required().messages({
         'string.base': 'Bank Name should be a type of text',
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
      gender: Joi.string().valid('Male', 'Female', 'Other').optional().messages({
        'string.base': 'Gender should be a type of text',
        'any.only': 'Gender must be one of [Male, Female, Other]',
      }),
      marital_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').optional().messages({
        'string.base': 'Marital status should be a type of text',
        'any.only': 'Marital status must be one of [Single, Married, Divorced, Widowed]',
    }),
      status: Joi.number(),
    
      //Dependent Field
     department: Joi.string().required().messages({
         'string.base': 'Department should be a type of text',
         'string.empty': 'Department cannot be empty',
         'any.required': 'Department is required'
      }),
      designation: Joi.string().required().messages({
         'string.base': 'Designation should be a type of text',
         'string.empty': 'Designation cannot be empty',
         'any.required': 'Designation is required'
      }),
      salary_grade: Joi.string().required().messages({
         'string.base': 'Salary grade should be a type of text',
         'string.empty': 'Salary grade cannot be empty',
         'any.required': 'Salary grade is required'
      }),

   })

   const options = { abortEarly: false, allowUnknown: false };
   return employeeSchema.validate(data, options);
}