const groupSeedData = [
    {
        name: 'Super Admin', code: 'SA001', permissions: [
            'permission:create', 'permission:list', 'permission:details', 'permission:update',
            'group:create', 'group:list', 'group:details', 'group:update',
            'department:create', 'department:list', 'department:update', 'department:details', 'department:statusUpdate',
            'designation:create', 'designation:list', 'designation:update', 'designation:details', 'designation:statusUpdate',
            'division:create', 'division:list', 'division:update', 'division:details', 'division:statusUpdate',
            'document:create', 'document:list', 'document:update', 'document:details', 'document:statusUpdate',
            'employeePolicy:create', 'employeePolicy:list', 'employeePolicy:update', 'employeePolicy:details', 'employeePolicy:statusUpdate', 'employeePolicy:getByEmpID',
            'employee:create', 'employee:list', 'employee:update', 'employee:details', 'employee:statusUpdate',
            'employeeSalary:create', 'employeeSalary:list', 'employeeSalary:update', 'employeeSalary:details', 'employeeSalary:statusUpdate',
            'policy:create', 'policy:list', 'policy:update', 'policy:details', 'policy:statusUpdate',
            'promotionAndIncrement:create', 'promotionAndIncrement:list', 'promotionAndIncrement:update', 'promotionAndIncrement:details', 'promotionAndIncrement:statusUpdate',
            'salaryGrade:create', 'salaryGrade:list', 'salaryGrade:update', 'salaryGrade:details', 'salaryGrade:statusUpdate',
            'unit:create', 'unit:list', 'unit:update', 'unit:details', 'unit:statusUpdate', 'unit:create',
            'leave-type:create', 'leave-type:list', 'leave-type:update', 'leave-type:details',
            'employee-leave:create', 'employee-leave:list', 'employee-leave:update', 'employee-leave:details',
            'employee-leave-balance:create', 'employee-leave-balance:list', 'employee-leave-balance:update'
        ]
    },
]

export default groupSeedData
