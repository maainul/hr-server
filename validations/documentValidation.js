import Joi from 'joi'

export const validateDocument = (data) => {
   const documentSchema = Joi.object({
      document_code: Joi.string().required().messages({
         'string.base': 'document code should be a type of text',
         'string.empty': 'document code cannot be empty',
         'any.required': 'document code is required'
      }),
      document_name: Joi.string().required().messages({
         'string.base': 'document name should be a type of text',
         'string.empty': 'document name cannot be empty',
         'any.required': 'document name code is required'
      }),
      longdescription: Joi.string().optional().messages({
         'string.base': 'longdescription should be a type of text',
      }),
      shortdescription: Joi.string().optional().messages({
         'string.base': 'shortdescription should be a type of text',
      }),
      document_link: Joi.string().required().messages({
         'string.base': 'document link should be a type of text',
         'string.empty': 'document link cannot be empty',
         'any.required': 'document link code is required'
      }),
      document_type: Joi.string().valid('Resume', 'Certificate', 'CoverLetter', 'NID').required().messages({
         'string.base': 'document type should be a type of text',
         'string.empty': 'document type cannot be empty',
         'any.required': 'document type code is required',
         'any.only': 'document type must be one of [Resume, Certificate, CoverLetter, NID, TIN, BirthCertificate, CompanyPDF, SOP]'
      }),
      issued_date: Joi.string().optional().messages({
         'string.base': 'document name should be a type of text',
         'string.empty': 'document name cannot be empty',
         'any.required': 'document name code is required'
      }),
      expiry_date: Joi.string().optional().messages({
         'string.base': 'document name should be a type of text',
         'string.empty': 'document name cannot be empty',
         'any.required': 'document name code is required'
      }),
      department: Joi.string().optional().messages({
         'string.base': 'Department should be a type of text',
      }),
      designation: Joi.string().optional().messages({
         'string.base': 'Designation should be a type of text',
      }),
      employee: Joi.string().optional().messages({
         'string.base': 'employee should be a type of text',
      }),
      unit: Joi.string().optional().messages({
         'string.base': 'unit should be a type of text',
      }),
      status: Joi.number()

   })

   const options = { abortEarly: false, allowUnknown: false };
   return documentSchema.validate(data, options);
}
