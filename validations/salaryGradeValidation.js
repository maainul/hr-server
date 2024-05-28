import Joi from 'joi';

export const validateSalaryGrade = (data) => {
    const salaryGradeSchema = Joi.object({
        grade_name: Joi.string().required().messages({
            'string.base': 'SalaryGrade name should be a type of text',
            'string.empty': 'SalaryGrade name cannot be empty',
            'any.required': 'SalaryGrade name is required'
        }),
        min_salary: Joi.number().required().messages({
            'number.base': 'Min Salary should be a type of number',
            'number.empty': 'Min Salary cannot be empty',
            'any.required': 'Min Salary is required'
        }),
        max_salary: Joi.number().required().messages({
            'number.base': 'Max Salary should be a type of number',
            'number.empty': 'Max Salary cannot be empty',
            'any.required': 'Max Salary is required'
        }),
        status: Joi.number()
    });

    const options = { abortEarly: false, allowUnknown: false };
    return salaryGradeSchema.validate(data, options);
};
