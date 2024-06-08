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
router.post("/create", checkPermission('salryGrade', 'create'), createSalaryGradeCtrl)

// UPDATE || Update SalaryGrade Status
router.get("/status", checkPermission('salryGrade', 'status'), updateSalaryGradeStatusCtrl)

// GET || ALL SalaryGrade Lists
router.get("/list", checkPermission('salryGrade', 'list'), getSalaryGradeCtrl)

// GET || Get Single SalaryGrade Details
router.get("/:id", checkPermission('salryGrade', 'details'), getSingleSalaryGradeCtrl)

// PUT || Update SalaryGrade Details
router.put("/:id", checkPermission('salryGrade', 'update'), updateSalaryGradeCtrl)



export default router
