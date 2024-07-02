
import cors from 'cors'
import morgan from 'morgan'
import colors from "colors";
import dotenv from "dotenv";
import express from 'express'
import cookieParser from 'cookie-parser';
import connectDB from './dbConnection.js';
import unitRoutes from "./routes/unitRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import menuRoutes from "./auth/routes/menuRoutes.js";
import userRoutes from './auth/routes/userRoutes.js'
import auth from './auth/middleware/authMiddleware.js';
import groupRoutes from "./auth/routes/groupRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import divisionRoutes from "./routes/divisionRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import designationRoutes from "./routes/designationRoutes.js";
import salaryGradeRoutes from "./routes/salaryGradeRoutes.js";
import permissionRoutes from "./auth/routes/permissionRoutes.js";
import employeePolicyRoutes from "./routes/employeePolicyRoutes.js";
import employeeSalaryRoutes from "./routes/employeeSalaryRoutes.js";
import promotionAndIncrementRoutes from "./routes/promotionAndIncrementRoutes.js";

//configure env
dotenv.config()

//databse config
connectDB()

//rest object
const app = express()

//middelwares

app.use(morgan('dev'))
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000", "https://hr.netlify.app"],
    credentials: true,
}))

// Router
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/unit', auth, unitRoutes)
app.use('/api/v1/menu', auth, menuRoutes)
app.use('/api/v1/policy', auth, policyRoutes)
app.use('/api/v1/auth/group', auth, groupRoutes)
app.use('/api/v1/division', auth, divisionRoutes)
app.use('/api/v1/employee', auth, employeeRoutes)
app.use('/api/v1/document', auth, documentRoutes)
app.use('/api/v1/department', auth, departmentRoutes)
app.use('/api/v1/designation', auth, designationRoutes)
app.use('/api/v1/salary-grade', auth, salaryGradeRoutes)
app.use('/api/v1/auth/permission', auth, permissionRoutes)
app.use('/api/v1/employee-policy', auth, employeePolicyRoutes)
app.use('/api/v1/employee-salary', auth, employeeSalaryRoutes)
app.use('/api/v1/promotion-increment', auth, promotionAndIncrementRoutes)

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
