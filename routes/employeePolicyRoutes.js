import express from 'express'
import {
    createEmployeePolicyCtrl,
    getEmployeePolicyCtrl,
    updateEmployeePolicyStatusCtrl,
    getSingleEmployeePolicyCtrl,
    updateEmployeePolicyCtrl
} from '../controllers/employeePolicyCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'
import { getSingleEmployeePolicyByEmployeeIDCtrl } from '../controllers/employeePolicyCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('employeePolicy', 'create'), createEmployeePolicyCtrl)

// UPDATE || Update EmployeePolicy Status
router.get("/status", checkPermission('employeePolicy', 'statusUpdate'), updateEmployeePolicyStatusCtrl)

// GET || ALL EmployeePolicy Lists
router.get("/list", checkPermission('employeePolicy', 'list'), getEmployeePolicyCtrl)

// GET || Get Single EmployeePolicy Details
router.get("/:id", checkPermission('employeePolicy', 'details'), getSingleEmployeePolicyCtrl)

// PUT || Update EmployeePolicy Details
router.put("/:id", checkPermission('employeePolicy', 'update'), updateEmployeePolicyCtrl)
// checkPermission('employeePolicy', 'getByEmpID'),
router.get("/by/:id", getSingleEmployeePolicyByEmployeeIDCtrl)


export default router
