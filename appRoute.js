import unitRoutes from "./routes/unitRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import menuRoutes from "./auth/routes/menuRoutes.js";
import userRoutes from './auth/routes/userRoutes.js'
import auth from './auth/middleware/authMiddleware.js';
import groupRoutes from "./auth/routes/groupRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import divisionRoutes from "./routes/divisionRoutes.js";
import leaveTypeRoutes from './routes/leaveTypeRoutes.js'
import departmentRoutes from "./routes/departmentRoutes.js";
import designationRoutes from "./routes/designationRoutes.js";
import salaryGradeRoutes from "./routes/salaryGradeRoutes.js";
import employeeLeaveRoutes from './routes/employeeLeaveRoutes.js'
import permissionRoutes from "./auth/routes/permissionRoutes.js";
import employeePolicyRoutes from "./routes/employeePolicyRoutes.js";
import employeeSalaryRoutes from "./routes/employeeSalaryRoutes.js";
import employeeLeaveBalanceRoutes from "./routes/employeeLeaveBalanceRoutes.js";
import promotionAndIncrementRoutes from "./routes/promotionAndIncrementRoutes.js";



const setupRoutes = (app) => {
    app.use('/api/v1/auth', userRoutes);
    app.use('/api/v1/unit', auth, unitRoutes);
    app.use('/api/v1/menu', auth, menuRoutes);
    app.use('/api/v1/policy', auth, policyRoutes);
    app.use('/api/v1/auth/group', auth, groupRoutes);
    app.use('/api/v1/division', auth, divisionRoutes);
    app.use('/api/v1/employee', auth, employeeRoutes);
    app.use('/api/v1/document', auth, documentRoutes);
    app.use('/api/v1/leave-type', auth, leaveTypeRoutes);
    app.use('/api/v1/department', departmentRoutes);
    app.use('/api/v1/designation', auth, designationRoutes);
    app.use('/api/v1/salary-grade', auth, salaryGradeRoutes);
    app.use('/api/v1/auth/permission', auth, permissionRoutes);
    app.use('/api/v1/employee-leave', auth, employeeLeaveRoutes);
    app.use('/api/v1/employee-policy', auth, employeePolicyRoutes);
    app.use('/api/v1/employee-salary', auth, employeeSalaryRoutes);
    app.use('/api/v1/promotion-increment', auth, promotionAndIncrementRoutes);
    app.use('/api/v1/employee-leave-balance', auth, employeeLeaveBalanceRoutes);
}

export default setupRoutes;