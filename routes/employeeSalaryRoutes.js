import express from 'express'
import {
    createEmployeeSalaryCtrl,
    getEmployeeSalaryCtrl,
    getSingleEmployeeSalaryCtrl,
    updateEmployeeSalaryCtrl
} from '../controllers/employeeSalaryCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('employeeSalary', 'create'), createEmployeeSalaryCtrl)

// GET || ALL EmployeeSalary Lists
router.get("/list", checkPermission('employeeSalary', 'list'), getEmployeeSalaryCtrl)

// GET || Get Single EmployeeSalary Details
router.get("/:id", checkPermission('employeeSalary', 'details'), getSingleEmployeeSalaryCtrl)

// PUT || Update EmployeeSalary Details
router.put("/:id", checkPermission('employeeSalary', 'update'), updateEmployeeSalaryCtrl)



export default router
