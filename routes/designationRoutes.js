import express from 'express'
import {
    createDesignationCtrl,
    getDesignationCtrl,
    updateDesignationStatusCtrl,
    getSingleDesignationCtrl,
    updateDesignationCtrl
} from '../controllers/designationCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createDesignationCtrl)

// UPDATE || Update Designation Status
router.get("/status", updateDesignationStatusCtrl)

// GET || ALL Designation Lists
router.get("/list", getDesignationCtrl)

// GET || Get Single Designation Details
router.get("/:id", getSingleDesignationCtrl)

// PUT || Update Designation Details
router.put("/:id", updateDesignationCtrl)



export default router
