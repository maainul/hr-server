import express from 'express'
import {
    createDepartmentCtrl,
    getDepartmentCtrl,
    updateDepartmentStatusCtrl,
    getSingleDepartmentCtrl,
    updateDepartmentCtrl
} from '../controllers/departmentCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('department', 'create'), createDepartmentCtrl)

// UPDATE || Update Department Status
router.get("/status", checkPermission('department', 'statusUpdate'), updateDepartmentStatusCtrl)

// GET || ALL Department Lists
router.get("/list", checkPermission('department', 'list'), getDepartmentCtrl)

// GET || Get Single Department Details
router.get("/:id", checkPermission('department', 'details'), getSingleDepartmentCtrl)

// PUT || Update Department Details
router.put("/:id", checkPermission('department', 'update'), updateDepartmentCtrl)



export default router
