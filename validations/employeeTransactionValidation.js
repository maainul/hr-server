import Joi from "joi";

export const validateEmployeeTransaction = (data) => {
  const leaveTypeSchema = Joi.object({
    leaveType: Joi.string().required().messages({
      "string.base": "leaveType should be a type of text",
      "string.empty": "leaveType cannot be empty",
      "any.required": "leaveType is required",
    }),
    totalLeave: Joi.number().required().messages({
      "number.base": "totalLeave should be a type of number",
      "any.required": "totalLeave is required",
    }),
    totalLeaveTaken: Joi.number().optional().messages({
      "number.base": "totalLeaveTaken should be a type of number",
    }),
    leaveBalance: Joi.number().optional().messages({
      "number.base": "leaveBalance should be a type of number",
    }),
    leavePending: Joi.number().optional().messages({
      "number.base": "leavePending should be a type of number",
    }),
  });

  const documentSchema = Joi.object({
    document_code: Joi.string().optional().messages({
      "string.base": "document_code should be a type of text",
      "string.empty": "document_code cannot be empty",
    }),
    document_name: Joi.string().required().messages({
      "string.base": "document_name should be a type of text",
      "string.empty": "document_name cannot be empty",
      "any.required": "document_name is required",
    }),
    longdescription: Joi.string().optional().messages({
      "string.base": "longdescription should be a type of text",
    }),
    shortdescription: Joi.string().optional().messages({
      "string.base": "shortdescription should be a type of text",
    }),
    document_link: Joi.string().required().messages({
      "string.base": "document_link should be a type of text",
      "string.empty": "document_link cannot be empty",
      "any.required": "document_link is required",
    }),
    document_type: Joi.string()
      .valid(
        "Resume",
        "Certificate",
        "CoverLetter",
        "NID",
        "TIN",
        "BirthCertificate",
        "CompanyPDF",
        "SOP"
      )
      .required()
      .messages({
        "string.base": "document_type should be a type of text",
        "string.empty": "document_type cannot be empty",
        "any.required": "document_type is required",
        "any.only":
          "document_type must be one of [Resume, Certificate, CoverLetter, NID, TIN, BirthCertificate, CompanyPDF, SOP]",
      }),
    issued_date: Joi.string().optional().messages({
      "string.base": "issued_date should be a type of text",
      "string.empty": "issued_date cannot be empty",
    }),
    expiry_date: Joi.string().optional().messages({
      "string.base": "expiry_date should be a type of text",
      "string.empty": "expiry_date cannot be empty",
    }),
    department: Joi.string().optional().messages({
      "string.base": "department should be a type of text",
    }),
    designation: Joi.string().optional().messages({
      "string.base": "designation should be a type of text",
    }),
  });

  const employeeSalaryDataSchema = Joi.object({
    employee: Joi.string().optional().messages({
      "string.base": "employee should be a type of text",
    }),
    basic: Joi.number().required().messages({
      "number.base": "basic salary should be a type of number",
      "any.required": "basic salary is required",
    }),
    houseRent: Joi.number().required().messages({
      "number.base": "house rent should be a type of number",
      "any.required": "house rent is required",
    }),
    medicalAllowance: Joi.number().required().messages({
      "number.base": "medical allowance should be a type of number",
      "any.required": "medical allowance is required",
    }),
    specialAllowance: Joi.number().optional().messages({
      "number.base": "special allowance should be a type of number",
    }),
  });

  const policySchema = Joi.object({
    policy: Joi.string().required().messages({
      "string.base": "policy should be a type of text",
      "string.empty": "policy cannot be empty",
      "any.required": "policy is required",
    }),
  });

  const employeeTransSchema = Joi.object({
    employeeID: Joi.string().optional().messages({
      "string.base": "employeeID should be a type of text",
      "string.empty": "employeeID cannot be empty",
    }),
    full_name: Joi.string().required().messages({
      "string.base": "full name should be a type of text",
      "string.empty": "full name cannot be empty",
      "any.required": "full name is required",
    }),
    father_name: Joi.string().required().messages({
      "string.base": "father name should be a type of text",
      "string.empty": "father name cannot be empty",
      "any.required": "father name is required",
    }),
    mother_name: Joi.string().required().messages({
      "string.base": "mother name should be a type of text",
      "string.empty": "mother name cannot be empty",
      "any.required": "mother name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "email should be a type of text",
      "string.empty": "email cannot be empty",
      "string.email": "email must be a valid email",
      "any.required": "email is required",
    }),
    phone: Joi.string().required().messages({
      "string.base": "phone number should be a type of text",
      "string.empty": "phone number cannot be empty",
      "any.required": "phone number is required",
    }),
    bank_account: Joi.string().optional().messages({
      "string.base": "bank account number should be a type of text",
    }),
    bank_name: Joi.string().optional().messages({
      "string.base": "bank name should be a type of text",
    }),
    permanent_address: Joi.string().required().messages({
      "string.base": "permanent address should be a type of text",
      "string.empty": "permanent address cannot be empty",
      "any.required": "permanent address is required",
    }),
    present_address: Joi.string().required().messages({
      "string.base": "present address should be a type of text",
      "string.empty": "present address cannot be empty",
      "any.required": "present address is required",
    }),
    date_of_joining: Joi.date().optional().messages({
      "date.base": "joining date should be a valid date",
    }),
    date_of_birth: Joi.date().optional().messages({
      "date.base": "birth date should be a valid date",
    }),
    emergency_contact_name: Joi.string().optional().messages({
      "string.base": "emergency contact name should be a type of text",
    }),
    emergency_contact_number_1: Joi.string().optional().messages({
      "string.base": "emergency contact number should be a type of text",
      "string.empty": "emergency contact number cannot be empty",
    }),
    emergency_contact_number_2: Joi.string().optional().messages({
      "string.base": "emergency contact number 2 should be a type of text",
    }),
    national_id: Joi.string().required().messages({
      "string.base": "national ID should be a type of text",
      "string.empty": "national ID cannot be empty",
      "any.required": "national ID is required",
    }),
    gender: Joi.string().valid("Male", "Female", "Other").optional().messages({
      "string.base": "gender should be a type of text",
      "any.only": "gender must be one of [Male, Female, Other]",
    }),
    religion: Joi.string()
      .valid("Hindu", "Muslim", "Christian", "Buddha", "Sikh", "Atheist")
      .optional()
      .messages({
        "string.base": "religion should be a type of text",
        "any.only":
          "religion must be one of [Hindu, Muslim, Christian, Buddha, Sikh, Atheist]",
      }),
    marital_status: Joi.string()
      .valid("Single", "Married", "Divorced", "Widowed")
      .optional()
      .messages({
        "string.base": "marital status should be a type of text",
        "any.only":
          "marital status must be one of [Single, Married, Divorced, Widowed]",
      }),
    blood_group: Joi.string().optional().messages({
      "string.base": "blood group should be a type of text",
    }),
    nationality: Joi.string().optional().messages({
      "string.base": "nationality should be a type of text",
    }),
    number_of_children: Joi.number().optional().messages({
      "number.base": "number of children should be a type of number",
    }),
    spouse_name: Joi.string().optional().messages({
      "string.base": "spouse name should be a type of text",
    }),
    spouse_dob: Joi.date().optional().messages({
      "date.base": "spouse date of birth should be a valid date",
    }),
    spouse_profession: Joi.string().optional().messages({
      "string.base": "spouse profession should be a type of text",
    }),
    marriage_date: Joi.date().optional().messages({
      "date.base": "marriage date should be a valid date",
    }),
    passport_issue_date: Joi.date().optional().messages({
      "date.base": "passport issue date should be a valid date",
    }),
    status: Joi.number(),
    department: Joi.string().required().messages({
      "string.base": "department should be a type of text",
      "string.empty": "department cannot be empty",
      "any.required": "department is required",
    }),
    designation: Joi.string().required().messages({
      "string.base": "designation should be a type of text",
      "string.empty": "designation cannot be empty",
      "any.required": "designation is required",
    }),
    salary_grade: Joi.string().required().messages({
      "string.base": "salary grade should be a type of text",
      "string.empty": "salary grade cannot be empty",
      "any.required": "salary grade is required",
    }),
    employeeSalary: employeeSalaryDataSchema.optional().messages({
      "object.base": "employeeSalary should be an object",
    }),
    documentData: documentSchema.optional().messages({
      "object.base": "documentData should be an object",
    }),
    leaveTypeData: Joi.array().items(leaveTypeSchema).optional().messages({
      "array.base": "leaveTypeData should be an array",
    }),
    policyData: Joi.array().items(policySchema).optional().messages({
      "array.base": "policyData should be an array",
    }),
  });

  const options = { abortEarly: false, allowUnknown: false };
  return employeeTransSchema.validate(data, options);
};
