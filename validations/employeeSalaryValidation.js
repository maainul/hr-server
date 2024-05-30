import Joi from 'joi'

export const validateEmployeeSalary = (data) => {
   const employeeSalarySchema = Joi.object({
      employee: Joi.string().required().messages({
         'string.base': 'employee name should be a type of text',
         'string.empty': 'employee name cannot be empty',
         'any.required': 'employee name is required'
      }),

      basic: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      houseRent: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      conveyance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      medicalAllowance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      fuelAllowance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      specialAllowance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      grossSalary: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      overtimePayment: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      arrearAdjustment: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      compensation: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      festivalAllowance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      utilityAllowance: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      leaveEncashment: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      otherAdjustment: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),
      grossPay: Joi.number().optional().message({
         'number.base': ' allowance should be a type of number',
      }),

   })


   const options = { abortEarly: false, allowUnknown: false };
   return employeeSalarySchema.validate(data, options);
}
