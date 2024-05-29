import express from 'express'
import { 
    createEmployeePolicyCtrl, 
    getEmployeePolicyCtrl,
    updateEmployeePolicyStatusCtrl,
    getSingleEmployeePolicyCtrl,
    updateEmployeePolicyCtrl  
} from '../controllers/employeePolicyCtrl.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createEmployeePolicyCtrl)

// UPDATE || Update EmployeePolicy Status
router.get("/status", updateEmployeePolicyStatusCtrl)

// GET || ALL EmployeePolicy Lists
router.get("/list", getEmployeePolicyCtrl)

// GET || Get Single EmployeePolicy Details
router.get("/:id",getSingleEmployeePolicyCtrl)

// PUT || Update EmployeePolicy Details
router.put("/:id",updateEmployeePolicyCtrl)



export default router
