import express from 'express'
import {
    createEmployeeCtrl,
    getEmployeeCtrl,
    updateEmployeeStatusCtrl,
    getSingleEmployeeCtrl,
    updateEmployeeCtrl
} from '../controllers/employeeCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('employee', 'create'), createEmployeeCtrl)

// UPDATE || Update Employee Status
router.get("/status", checkPermission('employee', 'statusUpdate'), updateEmployeeStatusCtrl)

// GET || ALL Employee Lists
router.get("/list", checkPermission('employee', 'list'), getEmployeeCtrl)

// GET || Get Single Employee Details
router.get("/:id", checkPermission('employee', 'details'), getSingleEmployeeCtrl)

// PUT || Update Employee Details
router.put("/:id", checkPermission('employee', 'update'), updateEmployeeCtrl)



export default router
