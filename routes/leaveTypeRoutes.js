import express from 'express'
import {
    createLeaveTypeCtrl,
    getLeaveTypeCtrl,
    getSingleLeaveTypeCtrl,
    updateLeaveTypeCtrl
} from '../controllers/leaveTypeCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('leave-type', 'create'), createLeaveTypeCtrl)


// GET || ALL LeaveType Lists
router.get("/list", checkPermission('leave-type', 'list'), getLeaveTypeCtrl)

// GET || Get Single LeaveType Details
router.get("/:id", checkPermission('leave-type', 'details'), getSingleLeaveTypeCtrl)

// PUT || Update LeaveType Details
router.put("/:id", checkPermission('leave-type', 'update'), updateLeaveTypeCtrl)



export default router
