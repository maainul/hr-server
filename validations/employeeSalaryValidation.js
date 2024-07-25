import Joi from 'joi'

export const validateEmployeeSalary = (data) => {
   const employeeSalarySchema = Joi.object({
      employee: Joi.string().required().messages({
         'string.base': 'employee name should be a type of text',
         'string.empty': 'employee name cannot be empty',
         'any.required': 'employee name is required'
      }),

      basic: Joi.number().required().messages({
         'number.base': 'basic salary should be a type of number',
         'any.required': ' basic salary is requiured',
      }),
      houseRent: Joi.number().required().messages({
         'number.base': 'house rent should be a type of number',
         'any.required': 'house rent is requiured',
      }),
      medicalAllowance: Joi.number().required().messages({
         'number.base': 'medica Allowance should be a type of number',
         'any.required': 'medical Allowance is requiured',
      }),
      specialAllowance: Joi.number().optional().messages({
         'number.base': 'medica Allowance should be a type of number',
         'any.required': 'medical Allowance is requiured',
      }),

   })


   const options = { abortEarly: false, allowUnknown: false };
   return employeeSalarySchema.validate(data, options);
}
