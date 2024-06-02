import express from 'express'
import {
    createSalaryGradeCtrl,
    getSalaryGradeCtrl,
    updateSalaryGradeStatusCtrl,
    getSingleSalaryGradeCtrl,
    updateSalaryGradeCtrl
} from '../controllers/salaryGradeCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createSalaryGradeCtrl)

// UPDATE || Update SalaryGrade Status
router.get("/status", updateSalaryGradeStatusCtrl)

// GET || ALL SalaryGrade Lists
router.get("/list", getSalaryGradeCtrl)

// GET || Get Single SalaryGrade Details
router.get("/:id", getSingleSalaryGradeCtrl)

// PUT || Update SalaryGrade Details
router.put("/:id", updateSalaryGradeCtrl)



export default router
