import express from 'express'
import {
    createEmployeeCtrl,
    getEmployeeCtrl,
    updateEmployeeStatusCtrl,
    getSingleEmployeeCtrl,
    updateEmployeeCtrl
} from '../controllers/employeeCtrl.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createEmployeeCtrl)

// UPDATE || Update Employee Status
router.get("/status", updateEmployeeStatusCtrl)

// GET || ALL Employee Lists
router.get("/list", getEmployeeCtrl)

// GET || Get Single Employee Details
router.get("/:id", getSingleEmployeeCtrl)

// PUT || Update Employee Details
router.put("/:id", updateEmployeeCtrl)



export default router
