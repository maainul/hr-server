import express from 'express'
import {
    createEmployeeSalaryCtrl,
    getEmployeeSalaryCtrl,
    getSingleEmployeeSalaryCtrl,
    updateEmployeeSalaryCtrl
} from '../controllers/employeeSalaryCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createEmployeeSalaryCtrl)

// GET || ALL EmployeeSalary Lists
router.get("/list", getEmployeeSalaryCtrl)

// GET || Get Single EmployeeSalary Details
router.get("/:id", getSingleEmployeeSalaryCtrl)

// PUT || Update EmployeeSalary Details
router.put("/:id", updateEmployeeSalaryCtrl)



export default router
