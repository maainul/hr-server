const permissionSeedData = [
  { resource: "permission", action: "create" },
  { resource: "permission", action: "list" },
  { resource: "permission", action: "details" },
  { resource: "permission", action: "update" },

  // Group
  { resource: "group", action: "create" },
  { resource: "group", action: "list" },
  { resource: "group", action: "details" },
  { resource: "group", action: "update" },

  // Department
  { resource: "department", action: "create" },
  { resource: "department", action: "list" },
  { resource: "department", action: "update" },
  { resource: "department", action: "details" },
  { resource: "department", action: "statusUpdate" },

  // Designation
  { resource: "designation", action: "create" },
  { resource: "designation", action: "list" },
  { resource: "designation", action: "update" },
  { resource: "designation", action: "details" },
  { resource: "designation", action: "statusUpdate" },

  // Division
  { resource: "division", action: "create" },
  { resource: "division", action: "list" },
  { resource: "division", action: "update" },
  { resource: "division", action: "details" },
  { resource: "division", action: "statusUpdate" },

  // Document
  { resource: "document", action: "create" },
  { resource: "document", action: "list" },
  { resource: "document", action: "update" },
  { resource: "document", action: "details" },
  { resource: "document", action: "statusUpdate" },

  // Employee Policy
  { resource: "employeePolicy", action: "create" },
  { resource: "employeePolicy", action: "list" },
  { resource: "employeePolicy", action: "update" },
  { resource: "employeePolicy", action: "details" },
  { resource: "employeePolicy", action: "statusUpdate" },
  { resource: "employeePolicy", action: "getByEmpID" },
  
  // Employee
  { resource: "employee", action: "create" },
  { resource: "employee", action: "list" },
  { resource: "employee", action: "update" },
  { resource: "employee", action: "details" },
  { resource: "employee", action: "statusUpdate" },

  // Employee Salary
  { resource: "employeeSalary", action: "create" },
  { resource: "employeeSalary", action: "list" },
  { resource: "employeeSalary", action: "update" },
  { resource: "employeeSalary", action: "details" },
  { resource: "employeeSalary", action: "statusUpdate" },

  // Policy
  { resource: "policy", action: "create" },
  { resource: "policy", action: "list" },
  { resource: "policy", action: "update" },
  { resource: "policy", action: "details" },
  { resource: "policy", action: "statusUpdate" },

  // Promotion And Increment
  { resource: "promotionAndIncrement", action: "create" },
  { resource: "promotionAndIncrement", action: "list" },
  { resource: "promotionAndIncrement", action: "update" },
  { resource: "promotionAndIncrement", action: "details" },
  { resource: "promotionAndIncrement", action: "statusUpdate" },

  // Salary Grade
  { resource: "salaryGrade", action: "create" },
  { resource: "salaryGrade", action: "list" },
  { resource: "salaryGrade", action: "update" },
  { resource: "salaryGrade", action: "details" },
  { resource: "salaryGrade", action: "statusUpdate" },

  // Unit
  { resource: "unit", action: "create" },
  { resource: "unit", action: "list" },
  { resource: "unit", action: "update" },
  { resource: "unit", action: "details" },
  { resource: "unit", action: "statusUpdate" },

  // Menu
  { resource: "menu", action: "create" },
  { resource: "menu", action: "list" },
  { resource: "menu", action: "update" },
  { resource: "menu", action: "details" },
  { resource: "menu", action: "statusUpdate" },

  // User
  { resource: "user", action: "create" },
  { resource: "user", action: "list" },
  { resource: "user", action: "update" },
  { resource: "user", action: "details" },
  { resource: "user", action: "statusUpdate" },
  { resource: "user", action: "profile" },

  // Leave Type
  { resource: "leave-type", action: "create" },
  { resource: "leave-type", action: "list" },
  { resource: "leave-type", action: "update" },
  { resource: "leave-type", action: "details" },

  // Leave Type
  { resource: "employee-leave", action: "create" },
  { resource: "employee-leave", action: "list" },
  { resource: "employee-leave", action: "update" },
  { resource: "employee-leave", action: "details" },
  { resource: "employee-leave", action: "leave-request-action" },

  // Leave Type
  { resource: "employee-leave-balance", action: "create" },
  { resource: "employee-leave-balance", action: "list" },
  { resource: "employee-leave-balance", action: "update" },
];

export default permissionSeedData;
