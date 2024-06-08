import express from 'express'
import {
    createEmployeePolicyCtrl,
    getEmployeePolicyCtrl,
    updateEmployeePolicyStatusCtrl,
    getSingleEmployeePolicyCtrl,
    updateEmployeePolicyCtrl
} from '../controllers/employeePolicyCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('employeePolicy', 'create'), createEmployeePolicyCtrl)

// UPDATE || Update EmployeePolicy Status
router.get("/status", checkPermission('employeePolicy', 'status'), updateEmployeePolicyStatusCtrl)

// GET || ALL EmployeePolicy Lists
router.get("/list", checkPermission('employeePolicy', 'list'), getEmployeePolicyCtrl)

// GET || Get Single EmployeePolicy Details
router.get("/:id", checkPermission('employeePolicy', 'details'), getSingleEmployeePolicyCtrl)

// PUT || Update EmployeePolicy Details
router.put("/:id", checkPermission('employeePolicy', 'update'), updateEmployeePolicyCtrl)


export default router
