import express from 'express'
import {
    createDesignationCtrl,
    getDesignationCtrl,
    updateDesignationStatusCtrl,
    getSingleDesignationCtrl,
    updateDesignationCtrl
} from '../controllers/designationCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('designation', 'create'), createDesignationCtrl)

// UPDATE || Update Designation Status
router.get("/status", checkPermission('designation', 'statusUpdate'), updateDesignationStatusCtrl)

// GET || ALL Designation Lists
router.get("/list", checkPermission('designation', 'list'), getDesignationCtrl)

// GET || Get Single Designation Details
router.get("/:id", checkPermission('designation', 'details'), getSingleDesignationCtrl)

// PUT || Update Designation Details
router.put("/:id", checkPermission('designation', 'update'), updateDesignationCtrl)



export default router
