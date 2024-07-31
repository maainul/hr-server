import express from 'express'
import { checkPermission } from '../auth/middleware/checkPermission.js'
import { createEmployeeLeaveCtrl, getEmployeeLeaveCtrl, getSingleEmployeeLeaveCtrl, leaveRequestActionCtrl, updateEmployeeLeaveCtrl } from '../controllers/employeeLeaveCtrl.js';


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('employee-leave', 'create'), createEmployeeLeaveCtrl)


// GET || ALL LeaveType Lists
router.get("/list", checkPermission('employee-leave', 'list'), getEmployeeLeaveCtrl)

// GET || Get Single LeaveType Details
router.get("/:id", checkPermission('employee-leave', 'details'), getSingleEmployeeLeaveCtrl)

// PUT || Update LeaveType Details
router.put("/:id", checkPermission('employee-leave', 'update'), updateEmployeeLeaveCtrl)

router.post("/leave-request-action", checkPermission('employee-leave', 'leave-request-action'), leaveRequestActionCtrl)



export default router
