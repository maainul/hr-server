import express from 'express'
import {
    createSalaryGradeCtrl,
    getSalaryGradeCtrl,
    updateSalaryGradeStatusCtrl,
    getSingleSalaryGradeCtrl,
    updateSalaryGradeCtrl
} from '../controllers/salaryGradeCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('salaryGrade', 'create'), createSalaryGradeCtrl)

// UPDATE || Update SalaryGrade Status
router.get("/status", checkPermission('salaryGrade', 'statusUpdate'), updateSalaryGradeStatusCtrl)

// GET || ALL SalaryGrade Lists
router.get("/list", checkPermission('salaryGrade', 'list'), getSalaryGradeCtrl)

// GET || Get Single SalaryGrade Details
router.get("/:id", checkPermission('salaryGrade', 'details'), getSingleSalaryGradeCtrl)

// PUT || Update SalaryGrade Details
router.put("/:id", checkPermission('salaryGrade', 'update'), updateSalaryGradeCtrl)



export default router
