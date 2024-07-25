import express from 'express'
import { checkPermission } from '../auth/middleware/checkPermission.js'
import { createEmployeeLeaveBalanceCtrl, getEmployeeLeaveBalanceCtrl, updateEmployeeLeaveBalanceCtrl } from './../controllers/employeeLeaveBalance.js';


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('employee-leave-balance', 'create'), createEmployeeLeaveBalanceCtrl)


// GET || ALL LeaveType Lists
router.get("/list", checkPermission('employee-leave-balance', 'list'), getEmployeeLeaveBalanceCtrl)

// GET || Get Single LeaveType Details
// router.get("/:id", checkPermission('employee-leave-balance', 'details'), getSingleEmployeeLeaveCtrl)

// PUT || Update LeaveType Details
router.put("/update", checkPermission('employee-leave-balance', 'update'), updateEmployeeLeaveBalanceCtrl)



export default router
